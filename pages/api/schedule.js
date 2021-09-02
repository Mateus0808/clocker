import { addHours, differenceInHours, format } from "date-fns"
import { firebaseServer } from "../../config/firebase/server"

const db = firebaseServer.firestore()
const agenda = db.collection('agenda')
const profile = db.collection('profiles')

const startAt = new Date(2021, 1, 1, 8, 0)
const endAt = new Date(2021, 1, 1, 17, 0)
const totalHours = differenceInHours(endAt, startAt)

const timeBlocks = []

for (let blockIndex = 0; blockIndex <= totalHours; blockIndex++) {
  const time = format(addHours(startAt, blockIndex), 'HH:mm')
  timeBlocks.push(time)
}

export default async function Schedule (req, res) {
  try {
    // const profileDoc = await profile
    //   .where('username', '==', req.query.username)
    //   .get()
    
    // const snapshot = await agenda
    //   .where('userId', '==', profileDoc.userId)
    //   .where('when', '==', req.query.when)
    //   .get()
    
    return res.status(200).json(timeBlocks)
  } catch(error) {
    console.log('FB ERROR ', error)
  }
  res.status(200).json({ name: 'John Boe'})
}