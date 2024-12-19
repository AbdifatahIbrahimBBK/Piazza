const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, // Reference to User model, use ObjectId for efficiency
    
    title: { 
        type: String, 
        required: true,
        trim: true, 
        maxLength: 100
    }, // Trim whitespace, max length for title

    topic: [{ 
        type: String, 
        required: true, 
        enum: ['Politics', 'Health', 'Sport', 'Tech'], 
    }], // Enforce allowed topics & lowercase.

    caption: { 
        type: String, 
        required: true,
        trim: true
    }, // Trim whitespace

    hashtags: [{ 
        type: String, 
        trim: true,
        lowercase: true
    }], // Array of hashtags, lowercase for consistency

    location: { 
        type: String,
         trim: true
    }, // Location can be optional

    imageUrl: { 
        type: String
    }, // Renamed to imageUrl, URL is more descriptive for an image

    timestamp: { 
        type: Date, 
        default: Date.now
    }, // More descriptive field name

    expiredate: { 
        type: Date, 
        default: () => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // Add 5 days

    },

    likes: [{
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
    }], //Added like and dislike counter

    dislikes: [{
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
    }],
   
    comments: [{ // Consider separate collection for scalability

        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
        commentText: { 
            type: String, 
            trim: true },

        timestamp: { 
            type: Date, 
            default: Date.now
        }


    }],
    status: { 
        type: String, 
        enum: ['Live', 'Expired'], 
        default: 'Live'
    }, //Add status of the post

    isDeleted: { 
        type: Boolean, 
        default: false
    } // Optional field to mark as deleted instead of physically deleting
});

module.exports = mongoose.model('posts', PostSchema);