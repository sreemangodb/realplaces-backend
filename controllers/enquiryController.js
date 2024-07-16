const Enquiry = require('../model/Enquiry')




const getEnquiryByEmail = async(req,res)=>{
    const { agentEmail } = req.body;

    try {
      const enquiry = await Enquiry.find({ agentEmail: agentEmail });
  
      if (!enquiry) {
        return res.status(404).json({ error: 'Enquiry not found' });
      }
  
      res.json(enquiry);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
}

const postEnquiry = async (req, res) =>{
  try {
    const newEnquiry = new Enquiry({
        propertyId: req.body.propertyId,
        agentEmail: req.body.agentEmail,
        name: req.body.name,
        phone: req.body.phone,
        required: req.body.required,
        note: req.body.note
    });

    const savedEnquiry = await newEnquiry.save();
    res.status(201).json(savedEnquiry);
} catch (error) {
    res.status(400).json({ message: error.message });
}
}


const deleteEnquiryById = async(req, res)=>{
  const {enquiryId} = req.body;
  
  try {
    const deletedEnquiry = await Enquiry.findOneAndDelete({ enquiryId: enquiryId });
    
    if (!deletedEnquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    
    res.status(200).json({ message: 'Enquiry deleted successfully', deletedEnquiry });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}
module.exports = {
    getEnquiryByEmail,
    postEnquiry,
    deleteEnquiryById
}