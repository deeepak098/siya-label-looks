import { db, collection, getDocs, getDoc, addDoc, setDoc, updateDoc, deleteDoc, doc, query, where, orderBy, storage, ref, uploadBytes, getDownloadURL } from '@/lib/firebase';

class FirebaseQueryBuilder {
  private colName: string;
  private conditions: any[] = [];
  private orderField: string | null = null;
  private orderDirection: 'asc' | 'desc' = 'asc';
  private headMode = false;

  constructor(colName: string) {
    this.colName = colName;
  }

  select(fields?: string, options?: { count?: string; head?: boolean }) {
    if (options?.head) {
      this.headMode = true;
    }
    return this;
  }

  eq(field: string, value: any) {
    this.conditions.push(where(field, '==', value));
    return this;
  }

  order(field: string, options?: { ascending?: boolean }) {
    this.orderField = field;
    this.orderDirection = options?.ascending === false ? 'desc' : 'asc';
    return this;
  }

  async then(resolve: (res: { data: any; error: any; count?: number }) => void) {
    try {
      let q = query(collection(db, this.colName), ...this.conditions);
      if (this.orderField) {
        q = query(q, orderBy(this.orderField, this.orderDirection));
      }
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

      resolve({
        data: this.headMode ? null : docs,
        error: null,
        count: docs.length
      });
    } catch (err: any) {
      resolve({ data: null, error: err, count: 0 });
    }
  }

  async insert(data: any | any[]) {
    try {
      const items = Array.isArray(data) ? data : [data];
      const inserted: any[] = [];

      for (const item of items) {
        if (item.id) {
          await setDoc(doc(db, this.colName, item.id), item);
          inserted.push(item);
        } else {
          const docRef = await addDoc(collection(db, this.colName), item);
          inserted.push({ id: docRef.id, ...item });
        }
      }

      return { data: inserted, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  }

  async update(data: any) {
    return {
      eq: (field: string, value: any) => {
        return {
          then: async (resolve: (res: { data: any; error: any }) => void) => {
            try {
              if (field === 'id') {
                await updateDoc(doc(db, this.colName, value), data);
              } else {
                const q = query(collection(db, this.colName), where(field, '==', value));
                const snapshot = await getDocs(q);
                for (const docSnap of snapshot.docs) {
                  await updateDoc(doc(db, this.colName, docSnap.id), data);
                }
              }
              resolve({ data: true, error: null });
            } catch (err: any) {
              resolve({ data: null, error: err });
            }
          }
        };
      }
    };
  }

  async delete() {
    return {
      eq: (field: string, value: any) => {
        return {
          then: async (resolve: (res: { data: any; error: any }) => void) => {
            try {
              if (field === 'id') {
                await deleteDoc(doc(db, this.colName, value));
              } else {
                const q = query(collection(db, this.colName), where(field, '==', value));
                const snapshot = await getDocs(q);
                for (const docSnap of snapshot.docs) {
                  await deleteDoc(doc(db, this.colName, docSnap.id));
                }
              }
              resolve({ data: true, error: null });
            } catch (err: any) {
              resolve({ data: null, error: err });
            }
          }
        };
      }
    };
  }
}

export const supabase = {
  from: (table: string) => new FirebaseQueryBuilder(table),
  storage: {
    from: (bucket: string) => ({
      upload: async (path: string, file: File) => {
        try {
          const fileRef = ref(storage, `${bucket}/${path}`);
          await uploadBytes(fileRef, file);
          return { data: { path }, error: null };
        } catch (err: any) {
          return { data: null, error: err };
        }
      },
      getPublicUrl: (path: string) => ({
        data: { publicUrl: `https://firebasestorage.googleapis.com/v0/b/siya-label-looks.appspot.com/o/${encodeURIComponent(bucket + '/' + path)}?alt=media` }
      })
    })
  },
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    signOut: async () => ({ error: null })
  }
};
