import Link from "next/link";
import { useRouter } from "next/router";

// ! Assets
import openings from "../../assets/data/openings";

// ! Components
import AppLayout from "../../components/core/App";
import { PageHeader, Paragraph, SubTitle, List } from "../../components/core/Prose";
import ApplicationForm from "../../components/pages/jobs/FormApplication";

export default function JobListing() {
	const router = useRouter();
	const { id } = router.query;

	const correspondingOpening = openings.find(opening => opening._id == id);
	const titleSuffix = correspondingOpening ? correspondingOpening.name : "Job Not Found";

	return (
		<AppLayout title={`The Chamomile Club | ${titleSuffix}`}>
			<div className="w-full container max-w-4xl mx-auto px-8 pt-28 pb-10">
				{
					correspondingOpening ? (
						<>
							<div className="h-72 relative mb-10">
								<img src={correspondingOpening.image} className="w-full h-full object-cover" alt={correspondingOpening.name}/>
								<div className="bg-black bg-opacity-10 absolute top-0 left-0 w-full h-full"/>
								<Link
									href="/jobs"
									className="block w-min whitespace-nowrap px-4 py-5 mb-5 text-white shadow-lg bg-green-800 dark:bg-invertedLight absolute top-5 left-5"
								>
									Back To Jobs
								</Link>
							</div>
							<PageHeader
								title={`Job: ${correspondingOpening.name}`}
								tagline={correspondingOpening.description}
							/>
							<SubTitle>Responsibilities</SubTitle>
							<List
								id="responsibility"
								items={correspondingOpening.responsibilities}
							/>
							<SubTitle>Desirables</SubTitle>
							<List
								id="desireables"
								items={correspondingOpening.desireables}
							/>
							<SubTitle>Interested? Apply Below</SubTitle>
							<ApplicationForm position={correspondingOpening.name}/>
						</>
					) : (
						<>
							<Paragraph>We Couldn't Find This Job Listing</Paragraph>
								<Link
									href="/jobs"
									className="block w-min whitespace-nowrap px-4 py-5 mt-5 text-white shadow-lg bg-green-800 dark:bg-invertedLight"
								>
									Back To Jobs
							</Link>
						</>
					)
				}
			</div>
		</AppLayout>
	)
}
