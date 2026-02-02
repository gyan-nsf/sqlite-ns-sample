declare namespace SQLITE {

    type standardCallback = (error: string, results: any) => void;
    type errorCallback = (error: string) => void;
    type dbCallback = (error: string, db: Database) => void;

    enum ResultType {
        RESULTSASARRAY = 1,
        RESULTSASOBJECT = 2
    }

    enum ValueType {
        VALUESARENATIVE = 4,
        VALUESARESTRINGS = 8
    }

    interface PreparedTransaction {
        execute(params: any, callback?: errorCallback): Promise<any>;
        finished(): void;
    }

    interface Database {
        version(versionOrCallback?:  number | standardCallback): Promise<number>;
        isOpen(): boolean;
        resultType(newResultType?: ResultType): ResultType;
        valueType(newValueType?: ValueType): ValueType;
        close(callback?: errorCallback): Promise<string>;

        execSQL(SQL: string|Array<string>, paramsOrCallback?: Array<any> | standardCallback, callback?: standardCallback): Promise<any>;
        get(SQL: string|Array<string>, paramsOrCallback?: Array<any> | standardCallback, callback?: standardCallback, mode?: ResultType): Promise<any>;
        all(SQL: string|Array<string>, paramsOrCallback?: Array<any> | standardCallback, callback?: standardCallback): Promise<any>;
        each(SQL: string, paramsOrCallback: Array<any> | standardCallback, callback?: standardCallback, finishedCallback?: standardCallback): Promise<any>;

        begin(callback?: errorCallback): Promise<any>;
        commit(callback?: errorCallback): Promise<any>;
        commitAll(callback?: errorCallback): Promise<any>;
        rollback(callback?: errorCallback): Promise<any>;
        rollbackAll(callback?: errorCallback): Promise<any>;

        prepare(SQL: string): PreparedTransaction;
    }

    interface Static {
        new(dbname:string, optionsOrCallback?: newDBOptions|dbCallback, callback?: dbCallback): Promise<Database>;
        isSqlite(obj: any): boolean;
        exists(name: string): boolean;
        deleteDatabase(name: string): void;
        copyDatabase(name: string, destName?: string): boolean;

        // ENUM's
         RESULTSASARRAY: typeof ResultType.RESULTSASARRAY;
         RESULTSASOBJECT: typeof ResultType.RESULTSASOBJECT;
         VALUESARENATIVE: typeof ValueType.VALUESARENATIVE;
         VALUESARESTRINGS: typeof ValueType.VALUESARESTRINGS;

         // Will be set to true if these plugins are installed
         HAS_COMMERCIAL: boolean;
         HAS_ENCRYPTION: boolean;
         HAS_SYNC: boolean;
    }

    interface newDBOptions {
        /**
         * Android Flags
         */
        androidFlags?: number;
        /**
         * iOS Flags
         */
        iosFlags?: number;
        /**
         * Create Read-only database
         */
        readOnly?: boolean;
        /**
         * Enable Multi-threading
         */
        multithreading?: boolean;
        /**
         * Encrypted Key
         */
        key?: string;
        /**
         * Used to Migrate a Encrypted database to the latest version
         */
        migrate?: boolean;
    }
}

declare var Sqlite:SQLITE.Static;
declare module "nativescript-sqlite" {
    export = Sqlite;
}
