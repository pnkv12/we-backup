
async function paginatedResults(p, l, model){
   
    const page = parseInt(p)
    const limit = parseInt(l)

    // Handle
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}
    
    // Show how many objects appear in the next page
    if(endIndex < await model.countDocuments().exec()) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }

    // Show how many objects appear in the previous page
    if (startIndex > 0){
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }

    results.results = await model.find().limit(limit).skip(startIndex).exec()
    return results 
    
}

module.exports = paginatedResults