import { rejects } from 'assert/strict';
import {MongoClient, Db} from 'mongodb';
import { resolve } from 'path/posix';

export default class Mongo{
    client: MongoClient;
    connstr: string;
    database: string;
    db: Db;
    
    constructor(connstr:string, database:string){
        this.client = {} as MongoClient;
        this.connstr = connstr;
        this.database = database;
        this.db = {} as Db;
    }

    get connect(): Db{
        return this.db
    }

    kill(): Promise<void>{
        return new Promise((resolve, reject) =>{
            this.client
                .close(true)
                .then(() =>{
                    resolve()
                })
                .catch((err) =>{
                    reject(err)
                })

        })
    }

    // setConnection():Promise<void>{
    //     return new Promise((resolve, reject) =>{
    //         MongoClient.connect(this.connstr,{
    //             useNewUrlParser: true,
    //             unifiedTopolog: true,
    //             keepAlive: true

    //         })
    //     })
    //     .then((d:MongoClient) =>{
    //         this.client = d;
    //         this.db = this.client.db(this.database);
    //         resolve()
    //     })
    //     .catch((err)=>{
    //         rejects(err)
    //     })
        
    // }
}