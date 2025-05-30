import { Card, Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Type.module.css";

export default function TheType() {
  const router = useRouter();
  const { type } = router.query;

  const [loading, setLoading] = useState(true);
  const [animal, setAnimal] = useState([]);

  useEffect(() => {
    if (!type) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/types/${type}`)
      .then((res) => res.json())
      .then((data) => {
        setAnimal(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch animal type", err);
        setLoading(false);
      });
  }, [type]);

  if (loading) return <p>Loading...</p>;
  if (!animal || animal.length === 0) return <p>No animals found.</p>;

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Adopt a {type}</h1>
      <Row>
        {animal.map((animal) => (
          <Col md={4} key={animal.id} className="mb-4">
            <Card>
              {animal.image && (
                <Card.Img variant="top" src={animal.image} height={200} style={{ objectFit: "cover" }} />
              )}
              <Card.Body>
                <Card.Title>{animal.name}</Card.Title>
                <Card.Text>
                   Breed: {animal.breed || "Unknown"} <br />
                    Age: {animal.age} year{animal.age > 1 ? "s" : ""} old <br />
                    Sex: {animal.sex}
                </Card.Text>
                  <a href={`/details/${animal._id}`} className={`text-primary ${styles.links}`}>
                                    Read More &gt;&gt;
                                  </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
