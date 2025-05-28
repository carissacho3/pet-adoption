import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/all`)
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch((err) => console.error("Failed to fetch pets", err));
  }, []);

  return (
    <>
      <div className={styles.thetitle}>
        <h1 className={styles.concertoneregular}>
          Every Pet Deserves a Loving Home.
        </h1>
        <h1 className={styles.concertoneregular}>
          {" "}
          <span className={styles.adopt}>Adopt </span> a Pet Today
        </h1>
      </div>

      <p className={`${styles.textfont} ${styles.concertoneregular}`}>
        Browse our available animals and learn more about the adoption process.
        Together, we can{" "}
        <span className={styles.textchange}>
          rescue, rehabilitate, and rehome pets in need.
        </span>{" "}
        Thank you for supporting our mission to bring joy to families through
        pet adoption.
      </p>
      <hr className={styles.hr}></hr>

      <h4 className={`${styles.subtitle} ${styles.concertoneregular}`}>
        Pets for Adoption
      </h4>

      <Container className="mt-4">
        <Row>
          {pets.map((pet) => (
            <Col key={pet.id} md={4} className="mb-4">
              <Card>
                {pet.image && (
                  <Card.Img
                    variant="top"
                    src={pet.image}
                    alt={pet.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{pet.name}</Card.Title>
                  <Card.Text>
                    Breed: {pet.breed || "Unknown"} <br />
                    Age: {pet.age} year{pet.age > 1 ? "s" : ""} old <br />
                    Sex: {pet.sex}
                  </Card.Text>
                  <a href={`/details/${pet._id}`} className={`text-primary ${styles.links}`}>
                    Read More &gt;&gt;
                  </a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
