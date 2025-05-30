import styles from "@/styles/AboutUs.module.css";
export default function AboutUs() {
  return (
    <>
      <h1 className={styles.header}>About us</h1>

      <h5 className={styles.header}>
        Welcome to Pet Adoption - Where Every Pet Finds a Home
      </h5>
      <p className={styles.par}>
        At Pet Adoption, our mission is simple: to connect loving families with
        homeless pets in need of a second chance. We believe every animal
        deserves a safe, happy, and nurturing environment. Since our founding in
        2019, we've helped thousands of cats, dogs, and other animals find
        forever homes.
      </p>

      <h5 className={styles.header}>Who We Are</h5>
      <p className={styles.par}>
        We are a passionate team of animal lovers, volunteers, and advocates
        dedicated to animal welfare. From rescuing strays and abandoned pets to
        organizing foster care and adoption events, our work is driven by
        compassion and commitment.
      </p>

      <h5 className={styles.header}>What We Do</h5>
      <ul>
        <li>
          Rescue & Rehabilitation - We provide medical care, food, and shelter
          to animals in need.
        </li>
        <li>
          Adoption Services - We match pets with the right families through a
          thoughtful and thorough adoption process.
        </li>
        <li>
          {" "}
          Foster Program - Our foster network offers temporary homes while pets
          await adoption.
        </li>
        <li>
          {" "}
          Community Education - We raise awareness about responsible pet
          ownership, spaying/neutering, and animal care.
        </li>
      </ul>

      <h5 className={styles.header}>Why It Matters</h5>
      <p className={styles.par}>
        Every year, millions of animals end up in shelters. Many never make it
        out. By adopting, you're not only saving a life—you're making room for
        us to rescue another in need.
      </p>

      <h5 className={styles.header}>Join Us</h5>
      <p className={styles.par}>
        Whether you're looking to adopt, foster, volunteer, or donate, your
        support makes all the difference. Together, we can give every pet the
        loving home they deserve.
      </p>

      <b > Thank you for being a part of our journey.</b>
      <p className={styles.par}>Love, <br></br>
      The Pet Adoption Team</p>
  
    </>
  );
}
