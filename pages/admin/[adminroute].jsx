import dynamic from "next/dynamic";
import Head from "next/head.js";

// Load the About component dynamically

const AdminDynamic = dynamic(() => import("../../components/Admin/Admin.jsx"));

export default function AdminPage() {
  return <><Head>
  <title>Admin sector - {process.env.NEXT_PUBLIC_SITE_NAME}</title>
</Head><AdminDynamic /></>;
}
