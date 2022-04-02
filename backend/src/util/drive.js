const {google} = require('googleapis')
const {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN_DRIVE} = require('../config/variables')

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN_DRIVE });
  
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

class handleDrive {

    //? Upload file to Google Drive
    async uploadFile(files, type, folderId, fileName){

        try {
            const response =  await drive.files.create({
                media: {
                    mimeType: type,
                    body: files
                },
                requestBody: {
                    name: `${fileName}-${Date.now()}`,
                    mimeType: type,
                    parents: [folderId]
                },
                fields: 'id',

            })

            return response.data

        } catch (error) {
            console.log(error.message)
        }
    }

    //? Delete file/folder in Google Drive
    async deleteFile(fileId) {
        try {
          const response = await drive.files.delete({
            fileId: fileId,
          });

          return response.data, response.status

        } catch (error) {
          console.log(error.message);
        }
    }

    //? Generate public url for file
    async generatePublicUrl(fileId) {
        try {
          await drive.permissions.create({
            fileId: fileId,
            requestBody: {
              role: 'reader',
              type: 'anyone',
            },
          });
      
          /* 
          * webViewLink: View the file in browser
          * webContentLink: Direct download link 
          */

          const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink',
          });
         return result.data

        } catch (error) {
          console.log(error.message);
        }
    }
      
    //? Create a folder
    async createFolder(folderName){

        try {
            const response =  await drive.files.create({
                requestBody: {
                    name: folderName,
                    mimeType: 'application/vnd.google-apps.folder'
                },
                fields: 'id',        
                   
            })

            return response.data

        } catch (error) {
            console.log(error.message)
        }
    
    }

}

module.exports = new handleDrive