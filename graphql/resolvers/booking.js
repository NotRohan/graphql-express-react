const Event = require('../../models/events')
const Booking = require('../../models/booking')
const { transformBooking, transformEvent } = require('./merge')



module.exports = {

    bookings: async () => {
        try {
            const bookings = await Booking.find()
            return bookings.map((booking) => {
                return transformBooking(booking)
            })
        } catch (error) {
            throw error;
        }
    },
    bookEvent: async args => {
        const fetchedEvent = await Event.findOne({ _id: args.eventId })
        const booking = new Booking({
            user: '5cade14938b58c5d6c347687',
            event: fetchedEvent
        })
        const result = await booking.save();
        return transformBooking(result)
    },
    cancelBooking: async args => {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event')
            const event = transformEvent(booking.event)
            await Booking.deleteOne({ _id: args.bookingId })
            return event;
        } catch (error) {
            throw error;
        }
    }
}