
type addr={
    id: number;
    company_name: string;
  coordinates: {
            lat:number,long:number
        };
}
const sampleJson: addr[] = [
  {
    id: 2,
    company_name: "Beta Services",
    coordinates: { lat: 53.480759, long: -2.242631 },
  },
  {
    id: 3,
    company_name: "Gamma Solutions",
    coordinates: { lat: 51.454514, long: -2.58791 },
  },
  {
    id: 4,
    company_name: "Delta Ventures",
    coordinates: { lat: 51.454263, long: -0.97813 },
    },
{
    id: 5,
    company_name: "Epsilon Corp",
    coordinates: { lat: 51.509865, long: -0.118092 },
},
{
    id: 6,
    company_name: "Zeta Industries",
    coordinates: { lat: 51.4074, long: -0.9811 },
},
{
    id: 7,
    company_name: "Eta Enterprises",
    coordinates: { lat: 52.205337, long: 0.121817 },
},
{
    id: 8,
    company_name: "Theta Technologies",
    coordinates: { lat: 48.8566, long: 2.3522 },
},
{
    id: 9,
    company_name: "Iota Innovations",
    coordinates: { lat: 40.712776, long: -74.005974 },
}
];



function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const toRadians = (degree) => degree * (Math.PI / 180);

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
}


function nearestColleagues(list: addr[]) {
    let source = { lat: 51.509865, long: -0.118092 };

    
    let nearestOffices = list.map(office => {
        return {
            ...office,
            distance: calculateDistance(
                source.lat,
                source.long,
                office.coordinates.lat,
                office.coordinates.long
            ),
        };
    }).filter(office=>office.distance<=100).sort((a,b)=>a.distance-b.distance)

    return nearestOffices;

    
}


console.log(nearestColleagues(sampleJson));