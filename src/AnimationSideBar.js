export default function AnimationSideBar({ runAnimation }) {
  return (
    <div className="animation-sidebar">
      <ul>
        <li onClick={() => runAnimation(1)}>animtion 1</li>
        <li onClick={() => runAnimation(2)}>animtion 2</li>
        <li onClick={() => runAnimation(3)}>animtion 3</li>
      </ul>
    </div>
  );
}
