// import getCurrentUser from "./actions/getCurrentUser";
import getListOfQuestion from "./actions/getListOfQuestion";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListQuestionCard from "./components/listings/ListQuestionCard";

export default async function Home() {

  const listings = await getListOfQuestion();
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listings.map((listing: any) => {
            return (
              <ListQuestionCard
                key={listing.id}
                data={listing}
                // currentUser={currentUser}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
