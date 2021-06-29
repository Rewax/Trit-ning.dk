// var feed = new Instafeed({
//     get: 'user',
//     userId: [user_id],
//     accessToken: '[IGQVJVVTVXeUc3OElSelUzOFFFMExubm1OSFBtd1Rra0dTeE5LRTg3Q21DTkZAidjc2SU9WNU1TTHFtS0NKelFzcFZAHZAkxTckp5ckxnbExnUWFKUlRKeksyd0tfWVZAmSE1VTzh2amxxRHpUcnVuMnZAwWAZDZD]',
//     resolution: 'low_resolution',
//     filter: function(image) {
//         return image.tags.indexOf('somehashtag') >= 0;
//     }
// });
// feed.run();
//
// let token = '19016646806f5a0e2c83af6ff3f21f8c', // learn how to obtain it below
//     userid = 1683199518554704, // User ID - get it in source HTML of your Instagram profile or look at the next example :)
//     num_photos = 4; // how much photos do you want to get
//
// $.ajax({
//     url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent', // or /users/self/media/recent for Sandbox
//     dataType: 'jsonp',
//     type: 'GET',
//     data: {access_token: token, count: num_photos},
//     success: function(data){
//         console.log(data);
//         for( x in data.data ){
//             $('ul').append('<li><img src="'+data.data[x].images.low_resolution.url+'"></li>'); // data.data[x].images.low_resolution.url - URL of image, 306х306
//             // data.data[x].images.thumbnail.url - URL of image 150х150
//             // data.data[x].images.standard_resolution.url - URL of image 612х612
//             // data.data[x].link - Instagram post URL
//         }
//     },
//     error: function(data){
//         console.log(data); // send the error notifications to console
//     }
// });


const fetchInstagramPhotos = async (accountUrl) => {
    const response = await axios.get(accountUrl)
    const json = JSON.parse(response.data.match(instagramRegExp)[1])
    const edges = json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(0, 8)
    const photos = edges.map(({ node }) => {
        return {
            url: `https://www.instagram.com/p/${node.shortcode}/`,
            thumbnailUrl: node.thumbnail_src,
            displayUrl: node.display_url,
            caption: node.edge_media_to_caption.edges[0].node.text
        }
    })
    return photos
}

try {
    const photos = fetchInstagramPhotos('https://www.instagram.com/tritraeningdk/')
    console.log(photos)
    // Do something with the photos
} catch (e) {
    console.error('Fetching Instagram photos failed', e)
}