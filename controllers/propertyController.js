const Property = require('../model/Property')



const getAllProperty = async (req, res) => {
    try {
        const users = await Property.find();
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
// Function to create a new property
const createProperty = async (req, res) => {
    try {
        const property = new Property(req.body);
        await property.save();
        res.status(201).json(property);
    } catch (err) {
        res.status(400).send(err.message);
    }
};
const districtCity = async (req, res) => {
    try {
        const result = await Property.aggregate([
          {
            $group: {
              _id: {
                state: '$location.state',
                districtCity: '$location.districtCity'
              }
            }
          },
          {
            $project: {
              _id: 0,
              state: '$_id.state',
              districtCity: '$_id.districtCity'
            }
          }
        ]);
    
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

      
};


// New function to get the count of properties in a given districtCity
const getPropertyCountByDistrictCity = async (req, res) => {
    try {
        const result = await Property.aggregate([
          {
            $group: {
              _id: {
                state: '$location.state',
                districtCity: '$location.districtCity'
              },
              propertyCount: { $sum: 1 } // Count the number of properties
            }
          },
          {
            $project: {
              _id: 0,
              state: '$_id.state',
              districtCity: '$_id.districtCity',
              propertyCount: 1
            }
          }
        ]);
    
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  };


//   
const getPropertiesByDateUploadAscending = async (req, res) => {
    try {
      const properties = await Property.find().sort({ dateUpload: 1 }).limit(4);
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  // 
  const getPropertiesByDistrictCityAndType = async (req, res) => {
    const { districtCity, propertyType } = req.query;
  
    try {
      let adjustedPropertyType = propertyType;
      if (propertyType === "Open") {
        adjustedPropertyType = "Open Plots";
      } else if (propertyType === "Farm") {
        adjustedPropertyType = "Farm Lands";
      }
  
      console.log("properties", `${districtCity} ${adjustedPropertyType}`);
  
      const properties = await Property.find({
        'location.districtCity': districtCity,
        'propertyType': adjustedPropertyType
      });
  
      res.status(200).json(properties);
    } catch (error) {
      console.error(error.message);  // Log the error to the server console
      res.status(500).json({ error: error.message });
    }
  };
  

  const getOnePropertyById = async (req,res) =>{
    try {
      const propertyId = req.body.propertyid;
      console.log(`propertyId ${propertyId}`)
      const property = await Property.findOne({ propertyid: propertyId });
      if (!property) {
          return res.status(404).json({ message: 'Property not found' });
      }
      res.json(property);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
  }

  const inecreaseViewById = async (req, res) =>{
    try {
      const propertyId = req.body.propertyid;
      console.log(`properyID ${propertyId}`)
      // Find the property by ID and increment the propertyViews by 1
      const property = await Property.findOneAndUpdate(
       { propertyid : propertyId},
        { $inc: { propertyViews: 1 } },
        { new: true }
      );
  
      if (!property) {
        return res.status(404).send('Property not found');
      }
  
      res.status(200).json(property);
    } catch (error) {
      res.status(500).send('Server error');
    }
  }

const getTopProperty = async(req,res) =>{
  try {
    const topProperties = await Property.find()
      .sort({ propertyViews: -1 })
      .limit(2);
       
      res.status(200).json(topProperties);
  } catch (error) {
    console.error('Error fetching top properties:', error);
    throw error;
  }
}

module.exports = {
    districtCity,
    getAllProperty,
    createProperty,
    getPropertyCountByDistrictCity,
    getPropertiesByDateUploadAscending,
    getPropertiesByDistrictCityAndType,
    getOnePropertyById,
    inecreaseViewById,
    getTopProperty
}