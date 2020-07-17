

import mongoose  from '../bin/connections'

const schema = {
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    gender: {type: String, required: true, enum: ['Male', 'Female', 'Others']},
    batch: { type: mongoose.SchemaTypes.String, ref: 'batch', required: false,},
    dob: { type: mongoose.SchemaTypes.String, required: true},
    course: {type: mongoose.SchemaTypes.String, ref: 'course' , required: false},
    role: {
        type: mongoose.SchemaTypes.String,
        required: true,
        enum: ['Teacher', 'Student']
    },
    phone: { type: mongoose.SchemaTypes.String, required: true },
    picture: {type: String, required: false, default: ''}
};
const collectionName = "user";
const userSchema = new mongoose.Schema(schema);
const User = mongoose.model(collectionName, userSchema);


const getAllUsers = (limit: number, offset: number, filters: any) => {
    const conditions = filters && (filters.batch  ) ? {batch: filters.batch || ''} : {}
    const courseFilter = filters && filters.course ? {course: {$in: filters.course}} : {}
    const role = filters && filters.role ? { role: filters.role} : {}
    return new Promise((resolve, reject) => {
        User.find({...conditions, ...role, ...courseFilter})
            .then( (users: any) => {
                    resolve(users || 'not');
            })
            .catch((error: any)=> {
                reject(error)
            })
    })

}

const getUserByEmail = (email: string) => {
    return new Promise((resolve, reject)=> {
        User.findOne({email: email})
            .select('email name password role batch course')
            .then((response: any)=> {
            resolve(response)
        }).catch((error: any)=> {
            reject(error)
        })
    })


}

const createUser = (userData: object) => {
    return new Promise((resolve, reject)=> {
       User.create(userData, (error: any, response: object) => {
           if(error){
               reject(error);
           }
           else {
               resolve(response)
           }
       })

    })

}

const findUserDetail = (userId: string) => {
    return new Promise((resolve, reject)=> {
        User.findById( userId, (error: any, response: any)=>  {
            if(error) {
                reject(error);
            } else {
                resolve(response);
            }
        })
    })
}

const updateUserDetail = (userId: string, userData: object) => {
    return new Promise((resolve, reject)=> {
        User.findByIdAndUpdate(userId, userData,(error: any, response: any) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        });
    })
}

const deleteUser = (userId: string) => {
    return new Promise((resolve, reject)=> {
       User.findByIdAndRemove(userId, (error: any, response: any) => {
           if(error) {
               reject(error);
           } else {
               resolve(response)
           }
       })
    })
}

export default {deleteUser, findUserDetail, createUser, getAllUsers, getUserByEmail, updateUserDetail}
