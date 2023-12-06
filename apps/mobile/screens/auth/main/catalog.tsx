import { ScrollView } from "react-native";

import { Button, Heading } from "@thechamomileclub/ui";

import { DisplayLayout } from "@/components/interfaces";

const CatalogScreen = () => {
	return (
		<DisplayLayout title="Catalog" subtitle="Everything the club" safe>
			<ScrollView className="flex-grow">
				<Button className="items-center justify-center bg-midnight rounded-lg h-32 mb-5">
					<Heading size="sm">Tea Menu</Heading>
				</Button>
				<Button className="items-center justify-center bg-midnight rounded-lg h-32 mb-5">
					<Heading size="sm">Members</Heading>
				</Button>
			</ScrollView>
		</DisplayLayout>
	)
}

export default CatalogScreen;
