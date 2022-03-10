let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");

// console.log(inputArr);


let command = inputArr[0];

// types from organish function -------
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx",
      "doc",
      "pdf",
      "xlsx",
      "xls",
      "odt",
      "ods",
      "odp",
      "odg",
      "odf",
      "txt",
      "ps",
      "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
    pic: ["jpeg", "png" , "jpg"]
  };


// File -----------------------

switch (command) {
    case "tree":
      treeFn(inputArr[1]);
      break;
    case "organize":
      organizeFn(inputArr[1]); 
      break;
    case "help":
      helpFn()
      break;
    default:
      console.log("PLEASE ENTER A VALID COMMAND");
      break;
  };



  function treeFn(dirPath) {
    console.log(" Tree command implementeed for ", dirPath);

  }


// Tree Function ----------------------------------------------------------------------------

function treeFn(dirpath) {
    if (dirpath == undefined) {
      console.log("Please enter a valid Path");
    } else {
      let doesExist = fs.existsSync(dirpath);
      if (doesExist) {
        treeHelper(dirpath, " ");
      }
    }
  }


// Tree Helper function 


  
  
  function treeHelper(targetPath, indent) {
    let isFile = fs.lstatSync(targetPath).isFile();
  
    if (isFile == true) {
      let fileName = path.basename(targetPath);
      console.log(indent + "├──" + fileName);
    } else {
      let dirName = path.basename(targetPath);
      console.log(indent + "└──" + dirName);
  
      let children = fs.readdirSync(targetPath);
  
      for (let i = 0; i < children.length; i++) {
        let childPath = path.join(targetPath, children[i]);
        treeHelper(childPath, indent + "\t");
      }
    }
  }
  




// Organize FUnction --------------------------------------------------------------------------
  function organizeFn(dirPath) {
        let destPath;
    if(dirPath == undefined) {
      console.log("PLease enter a Directory Path");
      return;
    } else {
      let doesExist = fs.existsSync(dirPath);
      if (doesExist ) {
        destPath = path.join(dirPath, "organized_files");
      
        if (fs.existsSync(destPath) == false) {
          fs.mkdirSync(destPath); 
        }
          
      }else {
        console.log("Kindly Enter the correct path ");
        return;
      }
    }
    organizeHelper(dirPath, destPath);

  }


  // organizeHelper-----

  function organizeHelper(src, dest) {
    let childNames = fs.readdirSync(src); 
   // console.log(childNames);

    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]); 
        let isFile = fs.lstatSync(childAddress).isFile(); 
    
        if (isFile) {
            // console.log(childNames[i]);
            let fileCategory = getCategory(childNames[i]);
            console.log(childNames[i], "  belongs to -->  ",fileCategory);

            sendFiles(childAddress, dest, fileCategory);
        }
      }
  }



// Send Files functions 

function sendFiles(srcFilePath, dest, fileCategory) {
    let catagoryPath = path.join(dest, fileCategory);
  
    if (fs.existsSync(catagoryPath) == false) {
      fs.mkdirSync(catagoryPath);
    }
  
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(catagoryPath, fileName);
  
    fs.copyFileSync(srcFilePath, destFilePath);  // copy 
   // fs.unlinkSync(srcFilePath); // cut 
  
    console.log(fileName + " copied to " + fileCategory);
  }
  


// getCategory ------


function getCategory(name) {
    let ext = path.extname(name); 
    
    ext = ext.slice(1);
    
  
    for (let type in types) {
      let cTypeArr = types[type];
      
  
      for (let i = 0; i < cTypeArr.length; i++) {
        if (ext == cTypeArr[i]) {
         
          return type; 
        }
      }
    }
  
    return "others";
  }


// Help Function ---------------------------------------------------------------------------------------

  function helpFn() {
    console.log(`List of all the commands -
                   1)Tree Command - node FO.js tree <dirName>
                   2) Organize- node FO.js organize <dirName>
                   3) Help - node FO.js help `);
  }

















