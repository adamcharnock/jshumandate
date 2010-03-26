new Test.Unit.Runner({
	setup: function() {
	},

	teardown: function() {
	},
	
	////// Relative parsing //////
	
	testParseDateRelativeTomorrow: function() { with(this) {
		var hd = HumanDate({date: "tomorrow"})
		var timestamp = Date.parse(new Date("03/26/2010 12:35:10"));
		var actual = hd.parseDateRelative(timestamp);
		assertEqual(new Date("03/27/2010 12:35:10").toString(), actual.toString());
	}},
	
	testParseDateRelativeYesterday: function() { with(this) {
		var hd = HumanDate({date: "yesterday"})
		var timestamp = Date.parse(new Date("03/26/2010 12:35:10"));
		var actual = hd.parseDateRelative(timestamp);
		assertEqual(new Date("03/25/2010 12:35:10").toString(), actual.toString());
	}},
	
	////// Day parsing //////
	
	//without next
	
	testParseDateDaySimple: function() { with(this) {
		var hd = HumanDate({date: "sunday"})
		var timestamp = Date.parse(new Date("03/26/2010 12:35:10"));
		var actual = hd.parseDateDay(timestamp);
		assertEqual(new Date("03/28/2010 12:35:10").toUTCString(), actual.toUTCString());
	}},
	
	testParseDateDayWrap: function() { with(this) {
		var hd = HumanDate({date: "thursday"})
		var timestamp = Date.parse(new Date("03/26/2010 12:35:10"));
		var actual = hd.parseDateDay(timestamp);
		assertEqual(new Date("03/01/2010 12:35:10").toString(), actual.toString());
	}},
	
	testParseDateDayWrapEqual: function() { with(this) {
		var hd = HumanDate({date: "friday"})
		var timestamp = Date.parse(new Date("03/26/2010 12:35:10"));
		var actual = hd.parseDateDay(timestamp);
		assertEqual(new Date("03/02/2010 12:35:10").toString(), actual.toString());
	}},
	
	//with next
	
	testParseDateDaySimpleNext: function() { with(this) {
		var hd = HumanDate({date: "next sunday"})
		var timestamp = 1269603759000; //a friday
		var actual = Date.parse(hd.parseDateDay(timestamp));
		assertEqual(1269603759000 + (86400000 * 9), actual);
	}},
	
	testParseDateDayWrapNext: function() { with(this) {
		var hd = HumanDate({date: "next thursday"})
		var timestamp = 1269603759000; //a friday
		var actual = Date.parse(hd.parseDateDay(timestamp));
		assertEqual(1269603759000 + (86400000 * 13), actual);
	}},
	
	testParseDateDayWrapEqualNext: function() { with(this) {
		var hd = HumanDate({date: "next friday"})
		var timestamp = 1269603759000; //a friday
		var actual = Date.parse(hd.parseDateDay(timestamp));
		assertEqual(1269603759000 + (86400000 * 7), actual);
	}},
	
	////// Month parsing //////
	
	// without next
	
	testParseDateMonthSimple: function() { with(this) {
		var hd = HumanDate({date: "June"})
		var timestamp = Date.parse(new Date("03/26/2010 12:35:10"));
		var actual = hd.parseDateMonth(timestamp);
		//+ 1 year of milliseconds
		assertEqual(new Date("06/26/2010 12:35:10").toString(), actual.toString());
	}},
	
	testParseDateMonthWrap: function() { with(this) {
		var hd = HumanDate({date: "January"})
		var timestamp = Date.parse(new Date("03/26/2010 12:35:10"));
		var actual = hd.parseDateMonth(timestamp);
		//+ 1 year of milliseconds
		assertEqual(new Date("01/26/2011 12:35:10").toString(), actual.toString());
	}},
	
	testParseDateMonthWrapEqual: function() { with(this) {
		var hd = HumanDate({date: "March"})
		var timestamp = Date.parse(new Date("03/26/2010 12:35:10"));
		var actual = hd.parseDateMonth(timestamp);
		//+ 1 year of milliseconds
		assertEqual(new Date("03/26/2011 12:35:10").toString(), actual.toString());
	}},
	
	testParseDateMonthShorterMonth: function() { with(this) {
		var hd = HumanDate({date: "February"})
		var timestamp = Date.parse(new Date("01/31/2010 12:00:00"));
		var actual = hd.parseDateMonth(timestamp);
		assertEqual(new Date("02/28/2010 12:00:00").toString(), actual.toString());
	}},
	
	testParseDateMonthShorterMonthLeapYear: function() { with(this) {
		var hd = HumanDate({date: "February"})
		var timestamp = Date.parse(new Date("01/31/2012 12:00:00"));
		var actual = hd.parseDateMonth(timestamp);
		assertEqual(new Date("02/29/2012 12:00:00").toString(), actual.toString());
	}},
	
	//with next
	
	testParseDateMonthSimple: function() { with(this) {
		var hd = HumanDate({date: "Next June"})
		var timestamp = Date.parse(new Date("03/26/2010 12:35:10"));
		var actual = hd.parseDateMonth(timestamp);
		//+ 1 year of milliseconds
		assertEqual(new Date("06/26/2011 12:35:10").toString(), actual.toString());
	}},
	
	testParseDateMonthWrap: function() { with(this) {
		var hd = HumanDate({date: "next January"})
		var timestamp = Date.parse(new Date("03/26/2010 12:35:10"));
		var actual = hd.parseDateMonth(timestamp);
		//+ 1 year of milliseconds
		assertEqual(new Date("01/26/2012 12:35:10").toString(), actual.toString());
	}},
	
	testParseDateMonthWrapEqual: function() { with(this) {
		var hd = HumanDate({date: "next March"})
		var timestamp = Date.parse(new Date("03/26/2010 12:35:10"));
		var actual = hd.parseDateMonth(timestamp);
		//+ 1 year of milliseconds
		assertEqual(new Date("03/26/2011 12:35:10").toString(), actual.toString());
	}},
	
	testParseDateMonthShorterMonth: function() { with(this) {
		var hd = HumanDate({date: "next February"})
		var timestamp = Date.parse(new Date("01/31/2010 12:00:00"));
		var actual = hd.parseDateMonth(timestamp);
		assertEqual(new Date("02/28/2011 12:00:00").toString(), actual.toString());
	}},
	
	testParseDateMonthShorterMonthLeapYear: function() { with(this) {
		var hd = HumanDate({date: "next February"})
		var timestamp = Date.parse(new Date("01/31/2011 12:00:00"));
		var actual = hd.parseDateMonth(timestamp);
		assertEqual(new Date("02/29/2012 12:00:00").toString(), actual.toString());
	}},
	
	//Get date
	
	testGetDateMonth: function() { with(this) {
		var now = Date.parse(new Date("01/31/2011 12:00:00"));
		var hd = HumanDate({date: "next February", now: now});
		var actual = hd.getDate();
		assertEqual(new Date("02/29/2012 12:00:00").toString(), actual.toString());
	}},
	
	testGetDateDay: function() { with(this) {
		var now = Date.parse(new Date("03/26/2010 12:00:00"));
		var hd = HumanDate({date: "sunday", now: now});
		var actual = hd.getDate();
		assertEqual(new Date("03/28/2010 12:00:00").toString(), actual.toString());
	}},
	
}); 