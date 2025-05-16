type Product = {
    id: string;
    make: string;
    model: string;
    price: number;
    images: string[];
    seller: string;
    location: string;
    phoneNumber: number;
}

const dummyProducts: Product[] = [
  {
    "id": "8d35ed02-1fd2-4873-8a04-562c855ab29f",
    "make": "Samsung",
    "model": "Galaxy F41",
    "price": 73407,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s22-ultra-5g-1.jpg"
    ],
    "seller": "Jane Smith",
    "location": "Delhi",
    "phoneNumber": 9920882974
  },
  {
    "id": "102616e8-e028-4164-aedd-0f402335157b",
    "make": "Realme",
    "model": "Realme 8",
    "price": 61681,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/realme/realme-gt-neo5-1.jpg"
    ],
    "seller": "Sara Khan",
    "location": "Jaipur",
    "phoneNumber": 7220714458
  },
  {
    "id": "962835cf-c5f9-4726-8151-e75e22d3df59",
    "make": "Samsung",
    "model": "Galaxy M32",
    "price": 58140,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s22-ultra-5g-1.jpg"
    ],
    "seller": "Rahul Mehra",
    "location": "Mumbai",
    "phoneNumber": 9969872749
  },
  {
    "id": "b7332a10-2ed6-40d0-a545-1794de686099",
    "make": "Samsung",
    "model": "Galaxy A52",
    "price": 76746,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s22-ultra-5g-1.jpg"
    ],
    "seller": "Rahul Mehra",
    "location": "Delhi",
    "phoneNumber": 9344671594
  },
  {
    "id": "9ab66286-3371-45cf-8ff3-3d30e9e2b313",
    "make": "Xiaomi",
    "model": "Mi 11X",
    "price": 29404,
    "images": [
      "https://shorturl.at/SurVG"
    ],
    "seller": "Tom Hardy",
    "location": "Ahmedabad",
    "phoneNumber": 9777484169
  },
  {
    "id": "564a9007-eccf-4345-a532-1ef0d6a5e0b5",
    "make": "Realme",
    "model": "Realme Narzo",
    "price": 51104,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/realme/realme-gt-neo5-1.jpg"
    ],
    "seller": "Tom Hardy",
    "location": "Ahmedabad",
    "phoneNumber": 7010779455
  },
  {
    "id": "f98e4324-9645-4c88-827b-0acea230c8e0",
    "make": "Xiaomi",
    "model": "Mi 11X",
    "price": 67974,
    "images": [
      "https://shorturl.at/SurVG"
    ],
    "seller": "John Doe",
    "location": "Bangalore",
    "phoneNumber": 8546696297
  },
  {
    "id": "e933efb1-e6ce-48b0-a694-aebc114d8e25",
    "make": "OnePlus",
    "model": "OnePlus 10R",
    "price": 30984,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg"
    ],
    "seller": "John Doe",
    "location": "Chennai",
    "phoneNumber": 9918382870
  },
  {
    "id": "86117709-1bd8-4184-b760-26b58b2a5eb9",
    "make": "Samsung",
    "model": "Galaxy F41",
    "price": 80627,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s22-ultra-5g-1.jpg"
    ],
    "seller": "Sara Khan",
    "location": "Mumbai",
    "phoneNumber": 7655552948
  },
  {
    "id": "7d2f246a-da7a-4fa7-a4b4-b2db11d36e5d",
    "make": "Realme",
    "model": "Realme C25",
    "price": 64636,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/realme/realme-gt-neo5-1.jpg"
    ],
    "seller": "Sara Khan",
    "location": "Jaipur",
    "phoneNumber": 7282814792
  },
  {
    "id": "69cdc4f4-0fa7-4100-810c-5146e68dbb20",
    "make": "Apple",
    "model": "iPhone 12",
    "price": 47426,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-1.jpg"
    ],
    "seller": "Tom Hardy",
    "location": "Pune",
    "phoneNumber": 8021650563
  },
  {
    "id": "1aaeba01-b9d5-4dc9-bf91-2b740b934df0",
    "make": "Apple",
    "model": "iPhone 15",
    "price": 51210,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-1.jpg"
    ],
    "seller": "John Doe",
    "location": "Delhi",
    "phoneNumber": 7723947948
  },
  {
    "id": "1edfd916-9832-4ce7-b053-e11ed6ee367f",
    "make": "Apple",
    "model": "iPhone 12",
    "price": 12484,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-1.jpg"
    ],
    "seller": "Alice Johnson",
    "location": "Jaipur",
    "phoneNumber": 7907866832
  },
  {
    "id": "0c716a5d-d100-4070-91e7-2799d9d6f772",
    "make": "OnePlus",
    "model": "OnePlus 8",
    "price": 71661,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg"
    ],
    "seller": "John Doe",
    "location": "Delhi",
    "phoneNumber": 7136532221
  },
  {
    "id": "f0e86659-e05d-4ab7-94f6-1eff8942ece6",
    "make": "Samsung",
    "model": "Galaxy S22",
    "price": 41706,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s22-ultra-5g-1.jpg"
    ],
    "seller": "Rahul Mehra",
    "location": "Surat",
    "phoneNumber": 7845257075
  },
  {
    "id": "7c58f4ff-0e35-48d1-8e28-f3b1dc63efc2",
    "make": "Realme",
    "model": "Realme X7",
    "price": 44002,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/realme/realme-gt-neo5-1.jpg"
    ],
    "seller": "John Doe",
    "location": "Delhi",
    "phoneNumber": 9933476923
  },
  {
    "id": "545a5f4d-fd06-44c1-b782-3d72fc8e748e",
    "make": "Samsung",
    "model": "Galaxy M32",
    "price": 61433,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s22-ultra-5g-1.jpg"
    ],
    "seller": "Alice Johnson",
    "location": "Delhi",
    "phoneNumber": 9561309285
  },
  {
    "id": "eaf6ce97-9add-45b6-b0d0-0b72612796a0",
    "make": "OnePlus",
    "model": "OnePlus 10R",
    "price": 58836,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg"
    ],
    "seller": "Rahul Mehra",
    "location": "Jaipur",
    "phoneNumber": 8107363456
  },
  {
    "id": "a2a094f9-f87c-4022-835e-84069c358116",
    "make": "Samsung",
    "model": "Galaxy S22",
    "price": 53739,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s22-ultra-5g-1.jpg"
    ],
    "seller": "Jane Smith",
    "location": "Ahmedabad",
    "phoneNumber": 9531842551
  },
  {
    "id": "b15726e5-d01a-4b85-8ca7-f7665d6d6935",
    "make": "OnePlus",
    "model": "OnePlus 11",
    "price": 61349,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg"
    ],
    "seller": "John Doe",
    "location": "Kolkata",
    "phoneNumber": 7874422472
  },
  {
    "id": "868de5c4-f9e3-4790-b9ad-7bb461a464b7",
    "make": "Samsung",
    "model": "Galaxy S21",
    "price": 84768,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s22-ultra-5g-1.jpg"
    ],
    "seller": "Tom Hardy",
    "location": "Jaipur",
    "phoneNumber": 7700099226
  },
  {
    "id": "25a4adcb-916f-4c2b-ba15-8475e4f9b638",
    "make": "Xiaomi",
    "model": "Mi 11X",
    "price": 79201,
    "images": [
      "https://shorturl.at/SurVG"
    ],
    "seller": "Sara Khan",
    "location": "Ahmedabad",
    "phoneNumber": 8967286044
  },
  {
    "id": "b7490f99-7782-4919-b6da-37f353fe9f25",
    "make": "Apple",
    "model": "iPhone 11",
    "price": 36085,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-1.jpg"
    ],
    "seller": "Rahul Mehra",
    "location": "Mumbai",
    "phoneNumber": 9107144076
  },
  {
    "id": "58800dae-0f58-41aa-a11e-a1d0bad22361",
    "make": "Xiaomi",
    "model": "Mi 11X",
    "price": 23177,
    "images": [
      "https://shorturl.at/SurVG"
    ],
    "seller": "Sara Khan",
    "location": "Ahmedabad",
    "phoneNumber": 8001911650
  },
  {
    "id": "0d200041-b297-4fb6-b632-68d5ce231150",
    "make": "OnePlus",
    "model": "OnePlus 8",
    "price": 78616,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg"
    ],
    "seller": "Alice Johnson",
    "location": "Delhi",
    "phoneNumber": 8425925356
  },
  {
    "id": "f0c3b1e1-87fd-4761-afbe-b551f64d9c26",
    "make": "Apple",
    "model": "iPhone 15",
    "price": 25559,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-1.jpg"
    ],
    "seller": "Sara Khan",
    "location": "Ahmedabad",
    "phoneNumber": 7004216655
  },
  {
    "id": "3d414b1a-ea09-45eb-aa2e-afeb6a8207d8",
    "make": "Apple",
    "model": "iPhone 15",
    "price": 28397,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-1.jpg"
    ],
    "seller": "Tom Hardy",
    "location": "Chennai",
    "phoneNumber": 7530982892
  },
  {
    "id": "3fa7f28d-dd13-4711-8ab7-978fa399f431",
    "make": "Realme",
    "model": "Realme 8",
    "price": 18600,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/realme/realme-gt-neo5-1.jpg"
    ],
    "seller": "Alice Johnson",
    "location": "Ahmedabad",
    "phoneNumber": 9468728171
  },
  {
    "id": "ed030ac9-8cba-4037-8852-920db4d1b25b",
    "make": "Xiaomi",
    "model": "Poco X3",
    "price": 80163,
    "images": [
      "https://shorturl.at/SurVG"
    ],
    "seller": "Alice Johnson",
    "location": "Surat",
    "phoneNumber": 7855965036
  },
  {
    "id": "10c47e22-511a-4499-94fa-176c6c6bb34b",
    "make": "Xiaomi",
    "model": "Redmi Note 11",
    "price": 58250,
    "images": [
      "https://shorturl.at/SurVG"
    ],
    "seller": "John Doe",
    "location": "Delhi",
    "phoneNumber": 8955410102
  },
  {
    "id": "00d70e3b-aa09-479e-9d05-2a68f814ed12",
    "make": "OnePlus",
    "model": "OnePlus 10R",
    "price": 66709,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg"
    ],
    "seller": "Tom Hardy",
    "location": "Hyderabad",
    "phoneNumber": 8910450012
  },
  {
    "id": "204526db-d6e8-4b57-8f9c-347ef715dcac",
    "make": "OnePlus",
    "model": "OnePlus Nord",
    "price": 53318,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg"
    ],
    "seller": "Sara Khan",
    "location": "Mumbai",
    "phoneNumber": 7451652989
  },
  {
    "id": "3513f7ab-c5a7-4821-8268-3527f0c89a54",
    "make": "Realme",
    "model": "Realme C25",
    "price": 72924,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/realme/realme-gt-neo5-1.jpg"
    ],
    "seller": "Alice Johnson",
    "location": "Bangalore",
    "phoneNumber": 9880095319
  },
  {
    "id": "1b07823f-2f64-4482-840e-698f9b87c1cb",
    "make": "Xiaomi",
    "model": "Redmi Note 10",
    "price": 21614,
    "images": [
      "https://shorturl.at/SurVG"
    ],
    "seller": "John Doe",
    "location": "Surat",
    "phoneNumber": 7577530884
  },
  {
    "id": "c729aac7-d067-4518-8bfc-f3ddd98e23fd",
    "make": "Realme",
    "model": "Realme C25",
    "price": 52356,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/realme/realme-gt-neo5-1.jpg"
    ],
    "seller": "Rahul Mehra",
    "location": "Surat",
    "phoneNumber": 8959689622
  },
  {
    "id": "40111a23-fb45-404d-9eae-906b295b19b0",
    "make": "Apple",
    "model": "iPhone 15",
    "price": 38794,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-1.jpg"
    ],
    "seller": "Rahul Mehra",
    "location": "Surat",
    "phoneNumber": 9124849507
  },
  {
    "id": "94fdc898-915b-4952-99d4-d0de16b32cbd",
    "make": "Apple",
    "model": "iPhone 15",
    "price": 61429,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-1.jpg"
    ],
    "seller": "Jane Smith",
    "location": "Hyderabad",
    "phoneNumber": 8934482050
  },
  {
    "id": "ef331d6c-015d-40fd-bd35-090d95f5845f",
    "make": "Xiaomi",
    "model": "Mi 11X",
    "price": 14374,
    "images": [
      "https://shorturl.at/SurVG"
    ],
    "seller": "Jane Smith",
    "location": "Ahmedabad",
    "phoneNumber": 9711725478
  },
  {
    "id": "504bda40-cf77-441a-b6e9-763f73c2f05c",
    "make": "OnePlus",
    "model": "OnePlus 10R",
    "price": 24170,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg"
    ],
    "seller": "Tom Hardy",
    "location": "Hyderabad",
    "phoneNumber": 7553057739
  },
  {
    "id": "2be55960-bbed-4305-8fd6-5cc85019917a",
    "make": "OnePlus",
    "model": "OnePlus 9",
    "price": 78762,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg"
    ],
    "seller": "John Doe",
    "location": "Kolkata",
    "phoneNumber": 8620766613
  },
  {
    "id": "30f9e0a5-8514-44b6-a9e9-be678179697d",
    "make": "Samsung",
    "model": "Galaxy M32",
    "price": 25240,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s22-ultra-5g-1.jpg"
    ],
    "seller": "Alice Johnson",
    "location": "Hyderabad",
    "phoneNumber": 7136434698
  },
  {
    "id": "fa9f5896-1bc3-4eb3-880f-deefd701d3e3",
    "make": "Xiaomi",
    "model": "Redmi K50",
    "price": 55207,
    "images": [
      "https://shorturl.at/SurVG"
    ],
    "seller": "Alice Johnson",
    "location": "Mumbai",
    "phoneNumber": 9115157885
  },
  {
    "id": "2bd41adb-5616-41ac-8101-4e8558f1fa87",
    "make": "Realme",
    "model": "Realme C25",
    "price": 10932,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/realme/realme-gt-neo5-1.jpg"
    ],
    "seller": "Sara Khan",
    "location": "Ahmedabad",
    "phoneNumber": 7028410936
  },
  {
    "id": "6e59da75-405c-4a68-bc82-cdb3d2b7aa89",
    "make": "Samsung",
    "model": "Galaxy F41",
    "price": 83211,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s22-ultra-5g-1.jpg"
    ],
    "seller": "Sara Khan",
    "location": "Surat",
    "phoneNumber": 9078642926
  },
  {
    "id": "5c8d1a20-69fe-4fbe-9bd9-411a15ceeee6",
    "make": "Xiaomi",
    "model": "Redmi K50",
    "price": 63126,
    "images": [
      "https://shorturl.at/SurVG"
    ],
    "seller": "Jane Smith",
    "location": "Delhi",
    "phoneNumber": 9796579456
  },
  {
    "id": "679ee2df-134f-4211-b2d3-a30bfb17de0d",
    "make": "Apple",
    "model": "iPhone 15",
    "price": 83177,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-1.jpg"
    ],
    "seller": "Sara Khan",
    "location": "Kolkata",
    "phoneNumber": 9008562428
  },
  {
    "id": "7f230d8c-edea-4978-905e-236d4351b371",
    "make": "Apple",
    "model": "iPhone 14",
    "price": 26992,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-1.jpg"
    ],
    "seller": "Sara Khan",
    "location": "Mumbai",
    "phoneNumber": 7505303604
  },
  {
    "id": "c894d072-c3b2-4016-a8cf-1b71aa624ca2",
    "make": "Realme",
    "model": "Realme GT",
    "price": 18727,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/realme/realme-gt-neo5-1.jpg"
    ],
    "seller": "Rahul Mehra",
    "location": "Mumbai",
    "phoneNumber": 9472370125
  },
  {
    "id": "725f8ed3-cb02-4c14-b0fa-eb07d04bb427",
    "make": "Xiaomi",
    "model": "Redmi Note 11",
    "price": 60165,
    "images": [
      "https://shorturl.at/SurVG"
    ],
    "seller": "Sara Khan",
    "location": "Mumbai",
    "phoneNumber": 9264945499
  },
  {
    "id": "cca5d07c-14fe-430d-93d1-28a62e7656d4",
    "make": "OnePlus",
    "model": "OnePlus 8",
    "price": 34657,
    "images": [
      "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-11-1.jpg"
    ],
    "seller": "Rahul Mehra",
    "location": "Surat",
    "phoneNumber": 7020511218
  }
]

export default dummyProducts