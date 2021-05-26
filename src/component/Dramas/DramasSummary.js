import classes from "./DramasSummary.module.css";

const DramasSummary = () => {
	return (
		<section className={classes.summary}>
			<h2>A site for chinese film and television</h2>
			<p>
				I found that lots of chinese learner struggling with seeking for chinese
				learning materials. So I create this website of chinese film and
				television show, for people outside China to learn chinese or just enjoy
				it!
			</p>
			<p>
				Open the .torrent file downloaded with utorrent, please keep the file so
				that other people can download faster
			</p>
		</section>
	);
};

export default DramasSummary;
