import cluster from 'node:cluster';
import { launchCluster } from './cluster'
import { launchHttpServer } from './server';
import { initdb } from './db/init.db';

const launchServer = (isRequiredClustering:Boolean)=>{
    initdb().then(()=>console.log(`synchronisation avec la BD reussi !`)).catch(error=>console.log(error))
    if(isRequiredClustering && cluster.isPrimary){
        launchCluster();
    }
    else{
        console.log(`${process.pid} is worker`);
        launchHttpServer();
    }
}

launchServer(false);