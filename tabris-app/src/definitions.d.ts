

/*
Blob definition is required from @types/pouchdb-core/index.d.ts
Definitions cannot be imported from lib.dom.d.ts (tsconfig compilerOptions.lib) as the definitions conflict with tabris/globals.d.ts

*/

interface Blob {
    readonly size: number;
    readonly type: string;
    slice(start?: number, end?: number, contentType?: string): Blob;
}

declare var window:any;



declare module 'pouchdb/dist/pouchdb' {
    const PouchDB: PouchDB.Static;
    export = PouchDB;
}

declare module 'pouchdb/dist/pouchdb.websql' {
    const PouchDB: PouchDB.Static;
    export = PouchDB;
}



declare var document:any;



