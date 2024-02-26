import dynamic from "next/dynamic";
import Head from "next/head.js";

// Load the About component dynamically

const AdminDynamic = dynamic(() => import("../../components/Admin/Admin.jsx"), { ssr: false });

export default function AdminPage() {
  return <AdminDynamic />;
}
