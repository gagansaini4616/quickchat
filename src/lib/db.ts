import { connect } from "mongoose";

const mongo_url = process.env.MONGODB_URL;
if (!mongo_url) {
    throw new Error("MONGODB_URL is not defined");
}

let cache = global.mongoose;

if (!cache) {
    cache = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
    if (cache.conn) {
        return cache.conn;
    }

    if (!cache.promise) {
        const opts = {
            bufferCommands: false, 
            family: 4 // Forces Node to use IPv4 instead of IPv6
        };

        cache.promise = connect(mongo_url, opts).then((c) => c.connection);
    }

    try {
        cache.conn = await cache.promise;
    } catch (error) {
        cache.promise = null; // Reset promise so it can try again on the next request
        console.error("Database connection error:", error);
        throw error;
    }

    return cache.conn;
};

export default connectDb;