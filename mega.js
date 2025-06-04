const mega = require("megajs");
const fs = require('fs');



const upload = (data, name) => {
    return new Promise((resolve, reject) => {
        try {
const emails = [
    "your meega acc email 1",
    "your meega acc email 2",
    "your meega acc email 3",
    "your meega acc email 4",
    "your meega acc email 5",
    "your meega acc email 6"
];

function getRandomEmail(emailList) {
    if (emailList.length === 0) {
        console.log("All emails have been selected.");
        return null;
    }
    const randomIndex = Math.floor(Math.random() * emailList.length);
    const selectedEmail = emailList.splice(randomIndex, 1)[0];
    return selectedEmail;
}

function saveLastLoggedInEmail(email) {
    fs.writeFileSync('mega_last_login_email.txt', email);
}

function getLastLoggedInEmail() {
    try {
        return fs.readFileSync('mega_last_login_email.txt', 'utf8');
    } catch (error) {
        return null;
    }
}

let remainingEmails = [...emails]; 
let previousSelectedEmail = getLastLoggedInEmail();
let selectedEmail = getRandomEmail(remainingEmails);

while (selectedEmail === previousSelectedEmail) {
    selectedEmail = getRandomEmail(remainingEmails);
}

saveLastLoggedInEmail(selectedEmail);         
console.log(`📶 Loging to ${selectedEmail} account... ⏩`)
 const auth = {
    email: selectedEmail,
    password: 'Your mega Accs password',  // use all email for one password (same password)
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246'
}
           
            const storage = new mega.Storage(auth, () => {
                const uploadStream = storage.upload({name: name, allowUploadBuffering: true});
                uploadStream.on("error", (err) => {
                    reject(err);
                });
                data.pipe(uploadStream);
                storage.on("add", (file) => {
                    file.link((err, url) => {
                        if (err) {
                            reject(err);
                        } else {
                            storage.close();
                            resolve(url);
                        }
                    });
                });
            });
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = { upload };
