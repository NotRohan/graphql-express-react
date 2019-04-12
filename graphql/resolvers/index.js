const Event = require('../../models/events')
const User = require('../../models/user')
const bcrypt = require('bcryptjs')

const user = async userId => {
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            createdEvents: events.bind(this, user._doc.createdEvents)
        }
    } catch (err) {
        throw err;
    }
}

const events = async eventIds => {
    try {
        const events = await Event.find({
            _id: {
                $in: eventIds
            }
        })
        events.map(event => {
            return {
                ...event._doc,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, event.creator)
            }
        })
        return events
    } catch (err) {
        throw err;
    }
}


module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
            return events.map(event => {
                return {
                    ...event._doc,
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event._doc.creator)
                };
            })
        } catch (err) {
            throw err;
        }
    },
    createEvent: async (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5cade14938b58c5d6c347687'
        })
        let createdEvent;
        try {
            const result = await event.save()
            createdEvent = {
                ...result._doc,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator)
            };
            const creator = await User.findById('5cade14938b58c5d6c347687')
            if (!creator) {
                throw new Error('User Not Found')
            }
            creator.createdEvents.push(event)
            await creator.save()
            return createdEvent
        } catch (err) {
            throw err
        };
    },
    createUser: async args => {
        try {
            const existingUser = await User.findOne({
                email: args.userInput.email
            })
            if (existingUser) {
                throw new Error('User Exists Already')
            }
            const hashedPassword = bcrypt.hash(args.userInput.password, 12)

            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            })
            const result = await user.save();
            return {
                ...result._doc,
                password: null
            }
        } catch (err) {
            throw err;
        }

    }
}