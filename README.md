# vespula
A genetic algorithm to simulate bee swarm and attack behavior


# simulation rules

1.) Random populations of these bees are created and grouped together these groups are known as swarms. <br>
2.) Bees will not attack other bees that are part of their respective swarm. <br>
3.) Bees have 2 modes that they can switch between defending and attacking <br>
4.) A bee will enter attack mode if it is proximity to another non related bee or senses a signal from a related bee to swarm against an enemy bee.<br>
5.) While in attack mode it will attempt to swarm against the bee it detected and if signaled will travel towards the origin of the signal in an attempt to detect said enemy bee <br>
5.) A bee will enter defense mode if it does not sense an enemy bee/attack signal for a period of time. <br>
6.) While in defense mode it will attempt to find swarmmates and will gather next to swarmmates it detects preferring to stay put. <br>
7.) A bee dies if it is swarmed by more than 4 bees of a different swarm (This is suppost to simulate heat balling) <br>
8.) Fitness of a swarm is determined by its life span and remaining population count <br>
9.) Bees will tend to circle around the average center of the swarm they are in. <br>
