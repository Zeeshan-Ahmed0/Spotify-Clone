let songsList = {
    "Alag asman": "Anuv Jain",
    "Antariksh": "Anuv Jain",
    "Gul": "Anuv Jain",
    "Husn": "Anuv Jain",
    "Ba khuda tum hi ho": "Atif Aslam",
    "Baaton ko teri": "Arijit Singh",
    "Humdard": "Arijit Singh",
    "Janam janam": "Arijit Singh",
    "Khairyat": "Arijit Singh",
    "Naina": "Arijit Singh",
    "Pal kesa pal": "Arijit Singh",
    "I'm on my way": "Alan Walker",
    "Ignite": "Alan Walker",
    "Who I am": "Alan Walker",
    "Mashup": "Alan Walker"
}

let singer = "alan"
let songs =[]

for (const key in songsList) {
    let element = songsList[key];
    element = element.toLowerCase()

    if(element.includes(singer)){
        songs.push(key)
    }
}
console.log(songs);