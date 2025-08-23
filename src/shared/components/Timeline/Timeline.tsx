const Timeline = (props: TimelineProps) => {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-5">
      {/* Timeline */}
      <div className="space-y-6">
        {props.timelineData.map((yearData, idx) => (
          <div key={idx}>
            <h2 className="text-xl font-semibold text-gray-700 text-left">{yearData.year}</h2>
            <div className="relative pl-2">
              {yearData.events.map((event, idx) => (
                <div key={idx} className="flex items-center space-x-4 mb-4">
                  <div className={`absolute left-0 w-3 h-3 rounded-full bg-${event.color} mt-1`} />
                  <div className="ml-6 border-l-2 border-gray-300 pl-4">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-500">{event.date}</p>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
