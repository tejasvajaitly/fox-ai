function Skills({ skills }: { skills: string[] }) {
  return (
    <div>
      <h1>Skills</h1>
      {skills.map((skill) => (
        <div key={skill} className="border border-gray-200 p-2 m-2">
          {skill}
        </div>
      ))}
    </div>
  );
}

export default Skills;
