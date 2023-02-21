export const listTalent = [
    {
        id: 1,
        name: 'Mathilda Lane',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        location: 'Riga, Latvia',
        coordinate: { lat: 56.946285, long: 24.105078 },
        age: 29,
        hobby: ['Bike Riding', 'Swimming', 'Skiing', 'Horse Riding', 'Racing', 'Jumping', 'Sport'],
        review: 6,
        rating: 5,
        gender: 'Female',
        liked: false
    },
    {
        id: 2,
        name: 'Ida Alexander',
        image: 'https://cdn.pixabay.com/photo/2020/02/16/07/24/girl-4852804_1280.jpg',
        location: 'Paris, France',
        coordinate: { lat: 48.864716, long: 2.349014 },
        age: 30,
        hobby: ['Bike Riding', 'Swimming', 'Skiing', 'Horse Riding', 'Hunting', 'Sleeping'],
        review: 31,
        rating: 4,
        gender: 'Female',
        liked: false
    },
    {
        id: 3,
        name: 'Bobby Norton',
        image: 'https://media.istockphoto.com/id/1364917563/photo/businessman-smiling-with-arms-crossed-on-white-background.jpg?b=1&s=170667a&w=0&k=20&c=KDO6yy-rASso-b0tI6Euv2um6GxXJ6QoQr0qioETwJE=',
        location: 'Vienna, Austria',
        coordinate: { lat: 48.210033, long: 16.363449 },
        age: 31,
        hobby: ['Bike Riding', 'Swimming', 'Skiing', 'Horse Riding'],
        review: 13,
        rating: 3,
        gender: 'Male',
        liked: false
    },
    {
        id: 4,
        name: 'Alex Crossan',
        image: 'https://media.istockphoto.com/id/1300972574/photo/millennial-male-team-leader-organize-virtual-workshop-with-employees-online.jpg?b=1&s=170667a&w=0&k=20&c=96pCQon1xF3_onEkkckNg4cC9SCbshMvx0CfKl2ZiYs=',
        location: 'London, England',
        coordinate: { lat: 51.509865, long: -0.118092 },
        age: 28,
        hobby: ['Bike Riding', 'Swimming', 'Skiing', 'Horse Riding', 'Mining'],
        review: 98,
        rating: 5,
        gender: 'Male',
        liked: false
    }
]

export const userdata = {
    image: 'https://thefader-res.cloudinary.com/private_images/w_2400,c_limit,f_auto,q_auto:best/1Night_01_1-1_g9qq0o/mura-masa-self-titled-album-lovesick-1-night-interview.jpg'
}

export const fallbackData = {
    id: 0,
    name: '',
    image: 'https://www.charlesrussellspeechlys.com/globalassets/configuration/fallback-images/fallback-image-person.jpg',
    location: '',
    age: 0,
    hobby: [],
    review: 0,
    rating: 0,
    gender: '',
    liked: false
}