import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

function TimelineGraphic(props) {
  const dateC = new Date(props.created);
  const createdDate = dateC.toString().substring(4, 15);

  const dateU = new Date(props.updated);
  const updatedDate = dateU.toString().substring(4, 15);

  return (
    <div>
      <Timeline>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Created At: {createdDate}</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>Updated At: {updatedDate}</TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}

export default TimelineGraphic;
