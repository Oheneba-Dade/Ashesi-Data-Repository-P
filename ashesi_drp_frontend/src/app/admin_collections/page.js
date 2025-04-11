import "../globals.css";
import AdminCollections from "@/components/AdminCollections";
import { BASE_URL } from "@/utils/constants";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminCollectionsTable() {
	return (
		<>
			<AdminCollections />
		</>
	);
}
