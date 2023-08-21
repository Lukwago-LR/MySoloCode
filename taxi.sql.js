import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

const db = await sqlite.open({
    filename: './taxi_queue.db',
    driver: sqlite3.Database
});


await db.migrate();

export async function joinQueue() {
    const sql = 'update taxi_queue set passenger_queue_count = passenger_queue_count+1'
    await db.run(sql);
}

export async function leaveQueue() {
    var count = await queueLength();
    if(count > 0){
        const sql = 'update taxi_queue set passenger_queue_count = passenger_queue_count-1'
        await db.run(sql);
    } 
}

export async function joinTaxiQueue() {
    const sql = 'update taxi_queue set taxi_queue_count = taxi_queue_count+1'
    await db.run(sql);
}

export async function queueLength() {
    const result = await db.all('select passenger_queue_count from taxi_queue');
    return result[0].passenger_queue_count;
}

export async function taxiQueueLength() {
    const result = await db.all('select taxi_queue_count from taxi_queue');
    return result[0].taxi_queue_count;
}

export async function taxiDepart() {
    var count = await queueLength();
    var countTaxi = await taxiQueueLength();

    if(count >= 12 && countTaxi > 0){

        await db.run('update taxi_queue set passenger_queue_count = passenger_queue_count-12');
        
        await db.run('update taxi_queue set taxi_queue_count = taxi_queue_count-1');
    };  

    return
}