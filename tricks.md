## Top Bar (Safe Area)
- We can use 
    `useSafeAreaInsets()` to get the height of the top bar and use that
        
      const insets = useSafeAreaInsets();

        <Tab.Navigation screenOptions={{
          tabBarStyle: {paddingTop: insets.top}
        }} >
      </Tab.Navigator>

