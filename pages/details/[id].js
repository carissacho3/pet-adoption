import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Id.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';

const getAuthToken = () => localStorage.getItem('token');

export default function AnimalDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  useEffect(() => {
    if (!id) return;


    fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAnimal(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch animal detail:", err);
        setLoading(false);
      });


    const token = getAuthToken();
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookmarks/bookmarks/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (res.ok) setBookmarked(true);
        })
        .catch(err => console.warn("Could not verify bookmark:", err));
    }
  }, [id]);

  const handleBookmark = async () => {
    const token = getAuthToken();
    if (!token) {
      alert("You must sign in to bookmark.");
      return;
    }

    setBookmarkLoading(true);

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/bookmarks/bookmarks/${id}`;
      const options = {
        method: bookmarked ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await fetch(url, options);

      if (!res.ok) {
        throw new Error(`${bookmarked ? "Remove" : "Add"} bookmark failed`);
      }

      setBookmarked(!bookmarked);
    } catch (error) {
      console.error("Bookmark error:", error);
      alert("Something went wrong while updating bookmark.");
    } finally {
      setBookmarkLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!animal) return <p>No animal found.</p>;

  return (
    <div className={styles.animalcard}>
      <img src={animal.image} alt={animal.name} className={styles.animalimage} />
      <div className={styles.animalinfo}>
        <h1>Hi! I am {animal.name}</h1>
        <p className={styles.animaldesc}>{animal.summary}</p>
        <p><b>Sex:</b> {animal.sex}</p>
        <p><b>Breed:</b> {animal.breed}</p>
        <p><b>Color:</b> {animal.color}</p>
        <p><b>Weight:</b> {animal.weight} kg</p>
        <p><b>Age:</b> {animal.age} year{animal.age > 1 ? "s" : ""}</p>
        {(animal.type === 'dog' || animal.type === 'cat') && (
  <p><b>Is Spayed or Neutered:</b> {animal.spayedOrNeutered ? 'Yes' : 'No'}</p>
)}
        <p><b>Location:</b> {animal.location}</p>
        <p><b>Phone Number:</b> {animal.phoneNumber}</p>

        <button onClick={handleBookmark} className={styles.bookmarkButton} disabled={bookmarkLoading}>
          <FontAwesomeIcon icon={bookmarked ? faBookmarkSolid : farBookmark} />
        </button>
      </div>
    </div>
  );
}
