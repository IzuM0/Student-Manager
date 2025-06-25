 const StudentRec = require('../model/studentRec.schema');


//create a new student record
 const  createStudentRec = async (req, res) => {
    const {firstName, lastName, email, age} = req.body;
    // Validate input
    if(!firstName || !lastName || !email || !age){
        return res.status(400).json({message: 'All fields are required'});
    }
    try{
        const existingUser = await StudentRec.findOne({ email });
        if(existingUser){
            return res.status(409).json({message: 'User already exists'});
        }

        // Create new student record
        const newStudentRec =  new StudentRec({
            firstName,
            lastName,
            email,
            age
        });
        await newStudentRec.save();
        return res.status(201).json({ message: 'Student created successfully', newStudentRec });


    }catch(error) {
        console.error('Error creating student record:', error);
        return res.status(500).json({message: 'Internal Server Error'});
       
    };
 }

// Get all student records
 const allStudents = async (req, res) =>{
  try{
    const students = await StudentRec.find({});
    if(students.length === 0){
      return res.status(404).json({message: 'No student records found'});
    }
    res.status(200).json({message: 'All student records', students});

  }catch(error){
    console.error('error fetching student records:', error);
    return res.status(500).json({message: 'Internal Server Error'});
  }
 }

 //update a student record
 const updateStudentrec = async (req,res)=>{
   try{
    const {id} = req.params;
    const {firstName, lastName, email, age} = req.body;

    const updateStudent = await StudentRec.findByIdAndUpdate(id, {
        firstName,
        lastName,
        email,
        age
        }, {new: true});

        if(!updateStudent){
            return res.status(404).json({message:'student record not found'})
        }
        return res.status(200).json({message: 'Student record updated successfully', updateStudent});

   }catch(error){
    console.error('Error updating student record:', error);

   }

 }
// delete a student record
 const deleteStudentrec = async(req,res)=>{
    const {id} =req.params;
    const deleteStudent = await StudentRec.findByIdAndDelete(id);
    res.status(200).json({message: 'Student deleted successfully', deleteStudent});
 }
 //count all student records
  const countStudents = async (req,res)=>{
    try{
          const count =   await StudentRec.countDocuments();
          return res.status(200).json({message: 'Total student records', count});
                
    }catch(error){
        console.error('Error counting student records:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
  }
  //search for student records
  const studentSearch = async (req,res) =>{
    try{
        const { email } = req.query;
        if(!email){
            return res.status(400).json({message: 'email is required for search'});
        }
        const student = await StudentRec.findOne({ email });
        if(!student){
            return res.status(404).json({message: 'Student record not found'});
        }
        return res.status(200).json({message: 'Student record found', student});
        
    }catch(error){
        console.error('Error searching for student record:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }

  }


module.exports = {
    createStudentRec,
    allStudents,
    updateStudentrec,
    deleteStudentrec,
    countStudents,
    studentSearch

}
 


