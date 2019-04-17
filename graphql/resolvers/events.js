const Event = require('../../models/events')
const { transformEvent } = require('./merge')
const User = require('../../models/user')

module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
            return events.map(event => {
                return transformEvent(event)
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
            createdEvent = transformEvent(result)
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
    }
}