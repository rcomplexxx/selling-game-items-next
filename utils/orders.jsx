// // pages/admin/checkdata.js

// import { getSession } from 'next-auth/react';
// import { fetchSensitiveData } from '../../utils/api'; // Function to fetch sensitive data

// export default function CheckData({ sensitiveData }) {
//   // Render sensitive data in the component
// }

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   // If the user is not authenticated, redirect them to the login page
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   // If the user is authenticated, fetch sensitive data
//   const sensitiveData = await fetchSensitiveData(session.user.id); // Example: Fetch data based on user ID

//   // Pass the fetched data as props to the component
//   return {
//     props: {
//       sensitiveData,
//     },
//   };
// }

// //Ovde prebaciti korisnika na admin rutu ako nije verifikovan korisnik kako bi mogao da se loguje.