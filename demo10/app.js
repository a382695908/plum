var request = require('superagent');
var urlencode = require("urlencode");
var async = require("async");
var fs = require("fs");

var imageUrls =[
  "https://www.what-dog.net/Images/DogBreed/Affenpinscher.png",
  "https://www.what-dog.net/Images/DogBreed/Afghan Hound.png",
  "https://www.what-dog.net/Images/DogBreed/Airedale Terrier.png",
  "https://www.what-dog.net/Images/DogBreed/Alaskan Malamute.png",
  "https://www.what-dog.net/Images/DogBreed/American Akita.png",
  "https://www.what-dog.net/Images/DogBreed/American Eskimo Dog.png",
  "https://www.what-dog.net/Images/DogBreed/American Staffordshire Terrier.png",
  "https://www.what-dog.net/Images/DogBreed/Anatolian Shepherd Dog.png",
  "https://www.what-dog.net/Images/DogBreed/Australian Cattle Dog.png",
  "https://www.what-dog.net/Images/DogBreed/Australian Shepherd.png",
  "https://www.what-dog.net/Images/DogBreed/Australian Terrier.png",
  "https://www.what-dog.net/Images/DogBreed/Basenji.png",
  "https://www.what-dog.net/Images/DogBreed/Basset Hound.png",
  "https://www.what-dog.net/Images/DogBreed/Beagle.png",
  "https://www.what-dog.net/Images/DogBreed/Bearded Collie.png",
  "https://www.what-dog.net/Images/DogBreed/Beauceron.png",
  "https://www.what-dog.net/Images/DogBreed/Belgian Malinois.png",
  "https://www.what-dog.net/Images/DogBreed/Bernese Mountain Dog.png",
  "https://www.what-dog.net/Images/DogBreed/Bichon Frise.png",
  "https://www.what-dog.net/Images/DogBreed/Black Russian Terrier.png",
  "https://www.what-dog.net/Images/DogBreed/Bloodhound.png",
  "https://www.what-dog.net/Images/DogBreed/Bluetick Coonhound.png",
  "https://www.what-dog.net/Images/DogBreed/Boerboel.png",
  "https://www.what-dog.net/Images/DogBreed/Border Collie.png",
  "https://www.what-dog.net/Images/DogBreed/Border Terrier.png",
  "https://www.what-dog.net/Images/DogBreed/Borzoi.png",
  "https://www.what-dog.net/Images/DogBreed/Boston Terrier.png",
  "https://www.what-dog.net/Images/DogBreed/Boxer.png",
  "https://www.what-dog.net/Images/DogBreed/Bracco Italiano.png",
  "https://www.what-dog.net/Images/DogBreed/Briard.png",
  "https://www.what-dog.net/Images/DogBreed/Brittany.png",
  "https://www.what-dog.net/Images/DogBreed/Brussels Griffon.png",
  "https://www.what-dog.net/Images/DogBreed/Bull Terrier.png",
  "https://www.what-dog.net/Images/DogBreed/Bulldog.png",
  "https://www.what-dog.net/Images/DogBreed/Cairn Terrier.png",
  "https://www.what-dog.net/Images/DogBreed/Cane Corso.png",
  "https://www.what-dog.net/Images/DogBreed/Cardigan Welsh Corgi.png",
  "https://www.what-dog.net/Images/DogBreed/Cavalier King Charles Spaniel.png",
  "https://www.what-dog.net/Images/DogBreed/Chesapeake Bay Retriever.png",
  "https://www.what-dog.net/Images/DogBreed/Chihuahua.png",
  "https://www.what-dog.net/Images/DogBreed/Chinese Crested.png",
  "https://www.what-dog.net/Images/DogBreed/Chow Chow.png",
  "https://www.what-dog.net/Images/DogBreed/Clumber Spaniel.png",
  "https://www.what-dog.net/Images/DogBreed/Cocker Spaniel.png",
  "https://www.what-dog.net/Images/DogBreed/Collie, Rough or Smooth.png",
  "https://www.what-dog.net/Images/DogBreed/Dachshund.png",
  "https://www.what-dog.net/Images/DogBreed/Dalmatian.png",
  "https://www.what-dog.net/Images/DogBreed/Dandie Dinmont Terrier.png",
  "https://www.what-dog.net/Images/DogBreed/Doberman Pinscher.png",
  "https://www.what-dog.net/Images/DogBreed/Dogo Argentino.png",
  "https://www.what-dog.net/Images/DogBreed/Dogue de Bordeaux.png",
  "https://www.what-dog.net/Images/DogBreed/Dutch Shepherd Dog.png",
  "https://www.what-dog.net/Images/DogBreed/English Cocker Spaniel.png",
  "https://www.what-dog.net/Images/DogBreed/English Setter.png",
  "https://www.what-dog.net/Images/DogBreed/English Springer Spaniel.png",
  "https://www.what-dog.net/Images/DogBreed/Flat Coated Retriever.png",
  "https://www.what-dog.net/Images/DogBreed/French Bulldog.png",
  "https://www.what-dog.net/Images/DogBreed/German Shepherd Dog.png",
  "https://www.what-dog.net/Images/DogBreed/German Shorthaired Pointer.png",
  "https://www.what-dog.net/Images/DogBreed/German Wirehaired Pointer.png",
  "https://www.what-dog.net/Images/DogBreed/Giant Schnauzer.png",
  "https://www.what-dog.net/Images/DogBreed/Golden Retriever.png",
  "https://www.what-dog.net/Images/DogBreed/Gordon Setter.png",
  "https://www.what-dog.net/Images/DogBreed/Great Dane.png",
  "https://www.what-dog.net/Images/DogBreed/Great Pyrenees.png",
  "https://www.what-dog.net/Images/DogBreed/Havanese.png",
  "https://www.what-dog.net/Images/DogBreed/Irish Setter.png",
  "https://www.what-dog.net/Images/DogBreed/Irish Water Spaniel.png",
  "https://www.what-dog.net/Images/DogBreed/Irish Wolfhound.png",
  "https://www.what-dog.net/Images/DogBreed/Italian Greyhound.png",
  "https://www.what-dog.net/Images/DogBreed/Keeshond.png",
  "https://www.what-dog.net/Images/DogBreed/Labrador Retriever.png",
  "https://www.what-dog.net/Images/DogBreed/Leonberger.png",
  "https://www.what-dog.net/Images/DogBreed/Lhasa Apso.png",
  "https://www.what-dog.net/Images/DogBreed/Maltese.png",
  "https://www.what-dog.net/Images/DogBreed/Mastiff.png",
  "https://www.what-dog.net/Images/DogBreed/Miniature Pinscher.png",
  "https://www.what-dog.net/Images/DogBreed/Miniature Schnauzer.png",
  "https://www.what-dog.net/Images/DogBreed/Newfoundland.png",
  "https://www.what-dog.net/Images/DogBreed/Norfolk Terrier.png",
  "https://www.what-dog.net/Images/DogBreed/Norwegian Elkhound.png",
  "https://www.what-dog.net/Images/DogBreed/Norwich Terrier.png",
  "https://www.what-dog.net/Images/DogBreed/Nova Scotia Duck Tolling Retriever.png",
  "https://www.what-dog.net/Images/DogBreed/Old English Sheepdog.png",
  "https://www.what-dog.net/Images/DogBreed/Papillon.png",
  "https://www.what-dog.net/Images/DogBreed/Pekingese.png",
  "https://www.what-dog.net/Images/DogBreed/Pembroke Welsh Corgi.png",
  "https://www.what-dog.net/Images/DogBreed/Petit Basset Griffon Vendeen.png",
  "https://www.what-dog.net/Images/DogBreed/Pointer.png",
  "https://www.what-dog.net/Images/DogBreed/Pomeranian.png",
  "https://www.what-dog.net/Images/DogBreed/Poodle.png",
  "https://www.what-dog.net/Images/DogBreed/Portuguese Water Dog.png",
  "https://www.what-dog.net/Images/DogBreed/Pug.png",
  "https://www.what-dog.net/Images/DogBreed/Rhodesian Ridgeback.png",
  "https://www.what-dog.net/Images/DogBreed/Rottweiler.png",
  "https://www.what-dog.net/Images/DogBreed/Saluki.png",
  "https://www.what-dog.net/Images/DogBreed/Samoyed.png",
  "https://www.what-dog.net/Images/DogBreed/Schipperke.png",
  "https://www.what-dog.net/Images/DogBreed/Scottish Terrier.png",
  "https://www.what-dog.net/Images/DogBreed/Shetland Sheepdog.png",
  "https://www.what-dog.net/Images/DogBreed/Shiba Inu.png",
  "https://www.what-dog.net/Images/DogBreed/Shih Tzu.png",
  "https://www.what-dog.net/Images/DogBreed/Siberian Husky.png",
  "https://www.what-dog.net/Images/DogBreed/Skye Terrier.png",
  "https://www.what-dog.net/Images/DogBreed/Soft-Coated Wheaten Terrier.png",
  "https://www.what-dog.net/Images/DogBreed/St. Bernard.png",
  "https://www.what-dog.net/Images/DogBreed/Staffordshire Bull Terrier.png",
  "https://www.what-dog.net/Images/DogBreed/Standard Schnauzer.png",
  "https://www.what-dog.net/Images/DogBreed/Tibetan Spaniel.png",
  "https://www.what-dog.net/Images/DogBreed/Vizsla.png",
  "https://www.what-dog.net/Images/DogBreed/Weimaraner.png",
  "https://www.what-dog.net/Images/DogBreed/West Highland White Terrier.png",
  "https://www.what-dog.net/Images/DogBreed/Yorkshire Terrier.png"
]


var checkExistDir = false;

function dealImageUrl(imageUrl,callback){
  var name = imageUrl.match(/[^\/$]*$/)[0];
  var cwd = process.cwd();
  var savePath = cwd + "/images/" + name;
  if(!checkExistDir){
    checkExistDir = true
    if(!fs.existsSync(cwd + "/images")){
      fs.mkdirSync(cwd + "/images");
    }
  }
  
  if (!(/^http:/.test(imageUrl) || /^https:/.test(imageUrl))){
    imageUrl = "http:"+imageUrl;
  }
  request.get(imageUrl)
  .end(function(err,res){
    if(err){
      console.log("url: " + imageUrl);
      callback(null,false);
      return ;
    }
    fs.writeFile(savePath,res.body);
    callback(null,true);
  });
}

  async.mapLimit(imageUrls, 4, function (url, callback) {
    dealImageUrl(url,callback);
  }, function (err, result) {
  });
