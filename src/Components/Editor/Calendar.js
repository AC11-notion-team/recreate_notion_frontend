import React from "react";
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';


const calendarOptions = {
    // sort of option properties.
  };
  

export default function MyComponent(){ 
    
    
    const calendar = [{
        calendars: [
        {
            id: 'cal1',
            name: 'Work',
        },
        ],
    }];
    calendar.createEvents([
        {
            id: 'event1',
            calendarId: 'cal1',
            title: 'Weekly Meeting',
            start: '2022-05-30T09:00:00',
            end: '2022-05-30T10:00:00',
        },
    ]);

    const firstEvent = calendar.getEvent('event1', 'cal1');
    console.log(firstEvent.title); // 'Weekly Meeting'

    
    // When changing multiple properties
    const updateEvent = calendar.updateEvent('event1', 'cal1', {
        title: 'Going vacation',
        state: 'Free',
        start: '2022-05-30T00:00:00',
        end: '2022-06-03T23:59:59',
    });

    const deleteEvent = calendar.deleteEvent('event1', 'cal1');

    // If you try to find the event, it does not exist.
    const deletedEvent = calendar.getEvent('event1', 'cal1');
    console.log(deletedEvent); // null

  
    const onAfterRenderEvent = (event) => {
        console.log(event.title);
    };
    const calendarRef = React.createRef();

    const handleClickNextButton = () => {
        const calendarInstance = calendarRef.current.getInstance();

        calendarInstance.next();
    };
    const handleClickBackButton = () =>{
        const calendarInstance = calendarRef.current.getInstance();
        calendarInstance.previous();
    }

    // const calendar = new Calendar('#container', {
    //     defaultView: 'month',
    //   });
   
    return(
        <div>
            <Calendar
                height="600px"
                view="month"
                month={{
                dayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                visibleWeeksCount: 0,
                isAlways6Weeks: true,
                useFormPopup: true,
                useDetailPopup: true,
                visibleEventCount: 6,
                }}

                calendar={calendar}
                firstEvent={firstEvent}
                updateEvent={updateEvent}
                deleteEvent={deleteEvent}
                
                onAfterRenderEvent={onAfterRenderEvent}
                ref={calendarRef} {...calendarOptions}
                // timezone = {
                //     // ...
                //     }
                // theme= {
                //     // ...
                // }
                // template= {
                //     // ...
                // }
                
            />
            <button onClick={handleClickBackButton}>return</button>
            <button onClick={handleClickNextButton}>Go next!</button>
        </div>

    )
}