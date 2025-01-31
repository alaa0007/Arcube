import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    /**INFO : i am using mongo atlas so i am using the uri and late the username and password not hidden for the test */
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb+srv://alaabouassida97:ZYCxZXKiH8KGmV5p@cluster0.uwz9d.mongodb.net/arcube_db?retryWrites=true&w=majority'),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {}
