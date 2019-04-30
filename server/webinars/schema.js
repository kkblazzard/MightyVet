var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
        management: {type: Boolean},
        communication: {type: Boolean},
        medical: {type: Boolean},
        technical: {type: Boolean}
})

// var QuestionSchema = new mongoose.Schema({
//         question:{type:String},
//         right_answer:{type:String},
//         wrong_answers:{type:[String]}
// }, {timestamps:true})

var WebinarSchema = new mongoose.Schema({
        title: {
                type: String,
                required: [true, "Please enter a title."],
                minlength: [true, "The title must be at least 5 characters long."]
        },
        type: {
                type: String,
                required: [true, "Please select a type."]
        }, //Live or Video

        datetime: {type: Date},

        description: {
                type: String,
                required: [true, "Please enter a description."],
                minlength: [true, "The description must be at least 10 characters long."]
        },

        users: [{type : mongoose.Schema.ObjectId, 
                ref : 'accreditation'}],  //list of user ids
        
        speaker: {type : mongoose.Schema.ObjectId, 
                ref : 'speaker',
                required: [true, "Please choose a speaker or create a new one."]
        },

        img: {
                type: String,
                required: [true, "Please upload an image... It may take a bit of time to load."]
        },

        webinar_link: {
                type: String,
                required: [true, "Please enter the link for the video."]
        },

        category: {
                type: CategorySchema,
                required: [true, "Please enter the category."]
        },

        // quiz: {
        //         type: [QuestionSchema],
        //         minlength: [3, "Your quiz should have at least 3 questions."]
        // },
        
}, {timestamps:true})

module.exports = WebinarSchema;