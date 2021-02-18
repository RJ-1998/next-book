import BookData from "../model/BookData"

async function HandleNew(req, res) {
    var { value } = req.body
    try {
        var docs = await BookData.find().limit(value)
        res.status(200).json(docs)
    } catch (err) {
        console.log(err)
    }
}
export default HandleNew