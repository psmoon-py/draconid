// DRACONID - Dragon-Powered Asteroid Defense Simulator
// Ultimate JavaScript Implementation - Fixed Navigation

class DRACONID {
    constructor() {
        this.name = "DRACONID";
        this.fullName = "Dragon-Powered Asteroid Defense Simulator";
        this.version = "2.0.0";
        
        // State management
        this.currentSection = 'home';
        this.selectedTarget = { lat: 40.7128, lng: -74.0060, name: 'New York, USA' };
        this.selectedStrategy = null;
        this.currentScenario = null;
        this.currentModule = null;
        this.currentLesson = 0;
        this.simulationCount = 0;
        this.dragonPower = 100;
        this.userXP = 0;
        this.dragonLevel = 'Hatchling';
        
        // 3D Scene variables
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.asteroids = [];
        this.animationId = null;
        this.solarSystemPaused = false;
        this.solarSystemSpeed = 1;
        
        // Physics constants enhanced for accuracy
        this.physics = {
            joulesToTNT: 4.184e9,
            joulesToMegaton: 4.184e15,
            earthRadius: 6371000,
            gravity: 9.81,
            craterScalingK: 1.161,
            blastScalingAlpha: 0.373,
            atmosphericDensity: 1.225,
            escapeVelocity: 11200,
            airburstAltitude: 30000
        };
        
        // Material properties with enhanced data
        this.materials = {
            stone: { 
                density: 3000, 
                strength: 5e6,
                description: "Rocky S-type asteroids - Most common (~75%)",
                color: "#8B7355",
                survivability: 0.7
            },
            iron: { 
                density: 8000, 
                strength: 2e8,
                description: "Metallic M-type asteroids - Dense and durable",
                color: "#C0C0C0",
                survivability: 0.95
            },
            carbon: { 
                density: 2000, 
                strength: 1e6,
                description: "Carbonaceous C-type asteroids - Primitive composition",
                color: "#2F2F2F",
                survivability: 0.5
            },
            ice: { 
                density: 1000, 
                strength: 1e5,
                description: "Cometary bodies - Mostly water ice and dust",
                color: "#E6F3FF",
                survivability: 0.3
            }
        };
        
        // Enhanced asteroid presets with real data
        this.asteroidPresets = {
            chelyabinsk: {
                name: "Chelyabinsk Meteor (2013)",
                diameter: 20,
                velocity: 19.16,
                material: "stone",
                angle: 18,
                description: "Injured 1,500 people in Russia with airburst",
                realEvent: true,
                energy: "500 kilotons TNT equivalent"
            },
            tunguska: {
                name: "Tunguska Event (1908)",
                diameter: 60,
                velocity: 27,
                material: "ice", 
                angle: 45,
                description: "Flattened 2,150 km² of Siberian forest",
                realEvent: true,
                energy: "15 megatons TNT equivalent"
            },
            apophis: {
                name: "99942 Apophis",
                diameter: 370,
                velocity: 7.42,
                material: "stone",
                angle: 60,
                description: "Will pass 31,000 km from Earth in 2029",
                realEvent: false,
                threat: "Potentially Hazardous Asteroid"
            },
            bennu: {
                name: "101955 Bennu", 
                diameter: 490,
                velocity: 6.14,
                material: "carbon",
                angle: 45,
                description: "Target of OSIRIS-REx sample return mission",
                realEvent: false,
                samples: "Returned to Earth in 2023"
            },
            dimorphos: {
                name: "Dimorphos",
                diameter: 160,
                velocity: 4.14,
                material: "stone",
                angle: 30,
                description: "Successfully deflected by NASA's DART mission",
                realEvent: false,
                deflection: "Orbit changed by 32 minutes"
            },
            chicxulub: {
                name: "Chicxulub Impactor",
                diameter: 10000,
                velocity: 20,
                material: "stone",
                angle: 60,
                description: "Caused mass extinction 66 million years ago",
                realEvent: true,
                energy: "100 million megatons TNT equivalent"
            }
        };
        
        // Dragon Defense Strategies Enhanced
        this.defenseStrategies = {
            kinetic: {
                name: "Dragon's Claw Strike",
                description: "Channel kinetic energy like a mighty dragon's claw impact",
                successRate: 85,
                leadTime: "6+ months",
                cost: "$300-500M",
                dragonPower: 75,
                realExample: "NASA DART mission successfully altered Dimorphos orbit by 32 minutes",
                advantages: ["Proven technology", "Precise targeting", "No radioactive debris"],
                disadvantages: ["Long lead time needed", "Limited to smaller asteroids", "Single attempt"]
            },
            gravity: {
                name: "Dragon's Gravitational Pull", 
                description: "Use gentle dragon magic to slowly guide asteroids away",
                successRate: 70,
                leadTime: "5+ years",
                cost: "$500M-1B",
                dragonPower: 90,
                realExample: "Theoretical concept studied by ESA and NASA, never flight-tested",
                advantages: ["Very precise control", "No fragmentation risk", "Continuous adjustment"],
                disadvantages: ["Extremely long lead time", "High cost", "Untested technology"]
            },
            nuclear: {
                name: "Dragon's Breath",
                description: "Unleash devastating dragon fire to vaporize asteroid surface",
                successRate: 90,
                leadTime: "6+ months",
                cost: "$1-2B",
                dragonPower: 95,
                realExample: "Studied in classified programs, complex international treaties required",
                advantages: ["Most powerful option", "Effective on large objects", "Short warning time"],
                disadvantages: ["Political complications", "Radioactive debris", "Difficult targeting"]
            },
            evacuation: {
                name: "Dragon's Protective Shield",
                description: "Protect populations under mighty dragon wings",
                successRate: 60,
                leadTime: "Weeks",
                cost: "$10B+ economic impact",
                dragonPower: 50,
                realExample: "Standard disaster preparedness protocols, saves lives but prevents no damage",
                advantages: ["Always available", "Saves lives", "Proven methods"],
                disadvantages: ["No damage prevention", "Massive disruption", "Limited effectiveness"]
            }
        };
        
        // Comprehensive Educational Modules with Deep Content
        this.educationModules = {
            detection: {
                title: "Dragon Eyes: Detection & Tracking",
                icon: "🔭",
                totalLessons: 12,
                xpReward: 200,
                lessons: [
                    {
                        title: "The Dragon's Vigilant Gaze: How We Find Asteroids",
                        content: `The ancient dragons of Draco constellation have watched over Earth for millennia, and now we use their wisdom in our asteroid detection systems. Ground-based telescopes like the Catalina Sky Survey operate like dragon eyes, scanning the heavens every night.

These automated dragon sentries use advanced CCD cameras to photograph the same patches of sky multiple times. Asteroids reveal themselves by moving against the backdrop of fixed stars - just as a dragon would spot movement in its territory. The Catalina Sky Survey alone discovers over 1,000 new asteroids monthly using this technique.

The LINEAR (Lincoln Near-Earth Asteroid Research) program uses similar methods, employing telescopes in New Mexico to detect objects as small as 50 meters across when they're millions of kilometers away. Like dragons with their keen eyesight, these systems can spot a city bus floating in space at the distance of the Moon.`,
                        interactiveDemo: "telescope_simulation",
                        duration: "10 minutes",
                        xp: 15
                    },
                    {
                        title: "Dragon Intelligence: Automated Identification Systems",
                        content: `Modern asteroid detection relies on artificial dragon intelligence - sophisticated algorithms that process thousands of images nightly. These digital dragon brains can distinguish between asteroids, satellites, cosmic rays, and image artifacts with 99.9% accuracy.

The process begins when telescopes capture sequential images of the same sky region. Software then performs "blink comparison" - rapidly switching between images to spot moving objects. This technique, inspired by how dragons track prey, was first used by Clyde Tombaugh to discover Pluto in 1930.

Machine learning systems, like digital dragon minds, continuously improve their ability to identify real threats. They analyze motion patterns, brightness variations, and orbital characteristics to separate dangerous Near-Earth Objects from harmless background asteroids.`,
                        interactiveDemo: "image_analysis_lab",
                        duration: "12 minutes",
                        xp: 20
                    }
                ]
            },
            physics: {
                title: "Dragon Force: Impact Physics",
                icon: "💥",
                totalLessons: 18,
                xpReward: 300,
                lessons: [
                    {
                        title: "The Dragon's Strike: Understanding Kinetic Energy",
                        content: `When a dragon strikes, the power depends on both its mass and speed - but speed matters far more. The same principle governs asteroid impacts through the kinetic energy equation: E = ½mv². This deceptively simple formula reveals why even small asteroids can be devastatingly powerful.

Consider the Chelyabinsk meteor: only 20 meters across but traveling at 19 km/s, it released energy equivalent to 500 kilotons of TNT - 33 times more powerful than the Hiroshima bomb. The key insight is that energy increases with the square of velocity, so doubling speed quadruples the destructive power.

A 100-meter asteroid at 20 km/s carries about 100 megatons of energy - 2,000 times more powerful than the largest nuclear weapons ever built. This is why astronomers focus on finding asteroids early: small changes in trajectory, applied years in advance, can redirect these cosmic dragons away from Earth.`,
                        interactiveDemo: "kinetic_energy_calculator",
                        duration: "12 minutes",
                        xp: 20
                    }
                ]
            },
            defense: {
                title: "Dragon Guard: Planetary Defense",
                icon: "🛡️",
                totalLessons: 15,
                xpReward: 250,
                lessons: [
                    {
                        title: "The DART Dragon: Proving Deflection Works",
                        content: `On September 26, 2022, humanity struck its first blow in planetary defense when NASA's DART spacecraft smashed into the asteroid Dimorphos like a high-tech dragon's claw. This $325 million mission proved that we can indeed change an asteroid's orbit - a historic achievement that marked the beginning of our active planetary defense era.

DART was essentially a 610-kilogram battering ram that struck Dimorphos at 6.14 km/s, delivering kinetic energy equivalent to about 5 tons of TNT. The impact changed Dimorphos's orbital period around its parent asteroid Didymos by 32 minutes - far exceeding the minimum 73-second change needed to declare success.

The mission revealed crucial insights about asteroid composition and deflection efficiency. High-resolution images showed Dimorphos to be a rubble pile held together by gravity, and the impact created a spectacular debris tail stretching thousands of kilometers. This real-world test validated decades of theoretical work and computer simulations.`,
                        interactiveDemo: "dart_mission_recreation",
                        duration: "18 minutes",
                        xp: 30
                    }
                ]
            },
            draconid: {
                title: "Dragon Lore: Draconid Mysteries",
                icon: "🐲",
                totalLessons: 10,
                xpReward: 150,
                lessons: [
                    {
                        title: "The Great Dragon in the Sky: Draco Constellation",
                        content: `High in the northern sky coils Draco, the mighty dragon constellation that has watched over Earth since ancient times. Wrapped around the north celestial pole, this serpentine star pattern contains some of the most fascinating objects in our galaxy and serves as the radiant point for the Draconid meteor shower.

Draco's most famous star is Thuban (Alpha Draconis), which served as Earth's pole star around 3000 BCE when the Egyptian pyramids were built. Due to Earth's axial precession, Thuban will again become the pole star around 21000 CE, completing a 26,000-year cycle that ancient astronomers might have seen as the dragon's eternal vigil.

The constellation stretches across 1083 square degrees of sky, making it the eighth-largest constellation. Its head is marked by the bright star Eltanin (Gamma Draconis), while its tail wraps between Ursa Major and Ursa Minor. Ancient cultures worldwide saw this star pattern as a dragon or serpent, from Greek mythology's Ladon to Chinese astronomy's Azure Dragon.`,
                        interactiveDemo: "constellation_mapper",
                        duration: "12 minutes",
                        xp: 18
                    }
                ]
            }
        };
        
        // Scenario generation system for infinite variability
        this.scenarioTemplates = {
            timeFrames: [
                { name: "Last-Minute Discovery", time: "6 months", difficulty: 0.9, description: "Recently detected object on collision course" },
                { name: "Standard Warning", time: "2 years", difficulty: 0.6, description: "Adequate time for careful mission planning" },
                { name: "Long-Term Threat", time: "10 years", difficulty: 0.3, description: "Plenty of time for multiple deflection attempts" },
                { name: "Generational Challenge", time: "50 years", difficulty: 0.4, description: "Multiple generations to solve the problem" }
            ],
            complications: [
                { name: "Budget Constraints", difficulty: +0.2, description: "Limited funding available for mission" },
                { name: "International Tensions", difficulty: +0.3, description: "Political disagreements hinder cooperation" },
                { name: "Technology Failure", difficulty: +0.4, description: "Primary deflection system malfunctions" },
                { name: "Multiple Objects", difficulty: +0.5, description: "Asteroid breaks into several pieces" },
                { name: "Unknown Composition", difficulty: +0.3, description: "Asteroid material properties uncertain" },
                { name: "Orbital Resonance", difficulty: +0.3, description: "Complex gravitational interactions" },
                { name: "Media Panic", difficulty: +0.2, description: "Public fear complicates response" },
                { name: "Launch Window Constraints", difficulty: +0.3, description: "Limited opportunities for missions" }
            ],
            asteroidTypes: [
                { name: "Rubble Pile", difficulty: +0.2, description: "Loose collection of rocks and boulders" },
                { name: "Solid Monolith", difficulty: -0.1, description: "Single, cohesive rocky body" },
                { name: "Binary System", difficulty: +0.4, description: "Two asteroids orbiting each other" },
                { name: "Comet-like", difficulty: +0.3, description: "Volatile-rich with outgassing" },
                { name: "Iron-Rich", difficulty: +0.1, description: "Dense metallic composition" },
                { name: "Fast Rotator", difficulty: +0.2, description: "Spinning rapidly, possibly unstable" }
            ]
        };
        
        // Achievement system
        this.achievements = new Set();
        this.achievementDefinitions = {
            first_simulation: { name: "Dragon Hatchling", description: "Complete your first impact simulation", xp: 50 },
            simulation_expert: { name: "Dragon Trainer", description: "Run 10 impact simulations", xp: 100 },
            city_killer: { name: "City Dragon", description: "Simulate a 1km+ asteroid impact", xp: 75 },
            extinction_event: { name: "Ancient Dragon", description: "Simulate a 10km+ extinction-level event", xp: 150 },
            earth_defender: { name: "Guardian Dragon", description: "Successfully complete a defense mission", xp: 200 },
            module_master: { name: "Wise Dragon", description: "Complete all lessons in a module", xp: 300 },
            knowledge_seeker: { name: "Scholar Dragon", description: "Earn 1000 total XP", xp: 500 },
            scenario_survivor: { name: "Battle-Tested Dragon", description: "Complete 5 defense scenarios", xp: 250 }
        };
        
        this.init();
    }
    
    async init() {
        try {
            console.log('🐉 Initializing DRACONID Dragon Defense System...');
            
            // Wait for DOM to be fully loaded
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }
            
            this.setupEventListeners();
            this.initializeTheme();
            this.updateDragonStats();
            this.startDragonAnimations();
            this.loadUserProgress();
            this.updateCalculations();
            
            // Show welcome message
            this.showDragonNotification('🐉 DRACONID awakens! The dragon is ready to defend Earth.', 'success');
            
            console.log('✅ DRACONID fully initialized and ready for dragon-powered defense!');
        } catch (error) {
            console.error('❌ DRACONID initialization failed:', error);
            this.showDragonNotification('⚠️ Dragon initialization failed. Attempting recovery...', 'error');
        }
    }
    
    setupEventListeners() {
        try {
            console.log('Setting up dragon event listeners...');
            
            // Enhanced Navigation with better error handling
            const setupNavigation = () => {
                // Navigation buttons in nav menu
                document.querySelectorAll('.nav-item[data-section]').forEach(element => {
                    element.addEventListener('click', (e) => {
                        e.preventDefault();
                        const section = e.target.getAttribute('data-section');
                        console.log('Nav clicked:', section);
                        if (section) {
                            this.navigateToSection(section);
                        }
                    });
                });
                
                // Action buttons on homepage
                document.querySelectorAll('.btn[data-section]').forEach(element => {
                    element.addEventListener('click', (e) => {
                        e.preventDefault();
                        const section = e.target.getAttribute('data-section');
                        console.log('Action button clicked:', section);
                        if (section) {
                            this.navigateToSection(section);
                        }
                    });
                });
                
                console.log('Navigation listeners attached');
            };
            
            // Setup navigation immediately if DOM is ready, otherwise wait
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', setupNavigation);
            } else {
                setupNavigation();
            }
            
            // Theme toggle
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', () => this.toggleTheme());
            }
            
            // Setup other controls after DOM is ready
            setTimeout(() => {
                this.setupSimulatorControls();
                this.setupDefenseControls();
                this.setupEducationControls();
                this.setupModalControls();
                this.setupTargetSelection();
                this.setup3DTrackerControls();
            }, 100);
            
        } catch (error) {
            console.error('Event listener setup failed:', error);
        }
    }
    
    navigateToSection(sectionId) {
        try {
            console.log('🐲 Dragon navigating to:', sectionId);
            
            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                console.log('✅ Section activated:', sectionId);
                
                // Update navigation
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                const activeNavItem = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('active');
                }
                
                this.currentSection = sectionId;
                
                // Section-specific initialization
                if (sectionId === 'tracker') {
                    setTimeout(() => this.initialize3DTracker(), 100);
                } else if (sectionId === 'defense') {
                    setTimeout(() => this.generateInitialScenario(), 100);
                } else if (sectionId === 'education') {
                    setTimeout(() => this.loadDailyWisdom(), 100);
                }
                
                // Dragon power animation
                this.animateDragonPower();
                
                this.showDragonNotification(`🐲 Dragon soars to ${this.getSectionDisplayName(sectionId)}`, 'info');
                
                // Scroll to top smoothly
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
            } else {
                console.error('Section not found:', sectionId);
                this.showDragonNotification('⚠️ Dragon lost its way', 'error');
            }
            
        } catch (error) {
            console.error('Navigation failed:', error);
            this.showDragonNotification('⚠️ Dragon navigation failed', 'error');
        }
    }
    
    getSectionDisplayName(sectionId) {
        const names = {
            'home': 'Dragon Lair',
            'simulator': 'Impact Forge',
            'tracker': '3D Dragon Vision',
            'defense': 'Defense Academy',
            'education': 'Knowledge Vault'
        };
        return names[sectionId] || sectionId;
    }
    
    setupSimulatorControls() {
        try {
            // Slider controls with enhanced feedback
            const diameterSlider = document.getElementById('diameter-slider');
            const velocitySlider = document.getElementById('velocity-slider');
            const angleSlider = document.getElementById('angle-slider');
            const materialSelect = document.getElementById('material-select');
            
            if (diameterSlider) {
                diameterSlider.addEventListener('input', (e) => {
                    const value = parseFloat(e.target.value);
                    this.updateDisplay('diameter-value', value);
                    this.updateSizeComparison(value);
                    this.updateCalculations();
                    this.animateSliderChange();
                });
            }
            
            if (velocitySlider) {
                velocitySlider.addEventListener('input', (e) => {
                    const value = parseFloat(e.target.value);
                    this.updateDisplay('velocity-value', value);
                    this.updateVelocityDescription(value);
                    this.updateCalculations();
                    this.animateVelocityTrail(value);
                });
            }
            
            if (angleSlider) {
                angleSlider.addEventListener('input', (e) => {
                    const value = parseFloat(e.target.value);
                    this.updateDisplay('angle-value', value);
                    this.updateTrajectoryVisualization(value);
                    this.updateCalculations();
                });
            }
            
            if (materialSelect) {
                materialSelect.addEventListener('change', (e) => {
                    this.updateMaterialPreview(e.target.value);
                    this.updateCalculations();
                });
                this.updateMaterialPreview(materialSelect.value);
            }
            
            // Launch button with enhanced animation
            const launchButton = document.getElementById('launch-simulation');
            if (launchButton) {
                launchButton.addEventListener('click', () => this.launchDragonSimulation());
            }
            
            // Preset buttons
            document.querySelectorAll('.preset-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const preset = e.target.getAttribute('data-preset');
                    if (preset && this.asteroidPresets[preset]) {
                        this.loadPreset(preset);
                    }
                });
            });
            
        } catch (error) {
            console.error('Simulator controls setup failed:', error);
        }
    }
    
    updateSizeComparison(diameter) {
        const comparison = document.getElementById('size-comparison');
        if (!comparison) return;
        
        let comparisonText = '';
        if (diameter < 10) {
            comparisonText = 'Car-sized';
        } else if (diameter < 50) {
            comparisonText = 'Building-sized';
        } else if (diameter < 100) {
            comparisonText = 'Football field';
        } else if (diameter < 500) {
            comparisonText = 'City block';
        } else if (diameter < 1000) {
            comparisonText = 'Small city';
        } else if (diameter < 5000) {
            comparisonText = 'Large city';
        } else {
            comparisonText = 'Extinction event';
        }
        
        comparison.textContent = comparisonText;
    }
    
    updateVelocityDescription(velocity) {
        const desc = document.getElementById('velocity-desc');
        if (!desc) return;
        
        let description = '';
        if (velocity < 15) {
            description = 'Slow cosmic speed';
        } else if (velocity < 25) {
            description = 'Typical asteroid';
        } else if (velocity < 40) {
            description = 'Fast incoming';
        } else if (velocity < 60) {
            description = 'Hypersonic';
        } else {
            description = 'Maximum speed';
        }
        
        desc.textContent = description;
    }
    
    updateTrajectoryVisualization(angle) {
        const trajectoryLine = document.getElementById('trajectory-line');
        if (trajectoryLine) {
            trajectoryLine.style.transform = `rotate(${angle}deg)`;
        }
    }
    
    updateMaterialPreview(materialType) {
        const preview = document.getElementById('material-preview');
        if (!preview) return;
        
        const material = this.materials[materialType];
        if (!material) return;
        
        preview.innerHTML = `
            <div class="material-info">
                <div class="material-color" style="background: ${material.color}; width: 20px; height: 20px; border-radius: 50%; display: inline-block; margin-right: 8px;"></div>
                <div class="material-details" style="display: inline-block;">
                    <div class="material-description">${material.description}</div>
                    <div class="material-properties">Survivability: ${(material.survivability * 100).toFixed(0)}%</div>
                </div>
            </div>
        `;
    }
    
    animateSliderChange() {
        // Add visual feedback for slider changes
        const sliders = document.querySelectorAll('.dragon-slider');
        sliders.forEach(slider => {
            slider.style.boxShadow = '0 0 20px rgba(31, 184, 205, 0.6)';
            setTimeout(() => {
                slider.style.boxShadow = '';
            }, 300);
        });
    }
    
    animateVelocityTrail(velocity) {
        const trail = document.querySelector('.velocity-trail');
        if (trail) {
            const intensity = velocity / 72;
            trail.style.background = `linear-gradient(90deg, transparent, rgba(31, 184, 205, ${intensity}), transparent)`;
            trail.style.animation = `velocity-streak ${2 - intensity}s ease-out infinite`;
        }
    }
    
    updateCalculations() {
        try {
            const diameter = parseFloat(document.getElementById('diameter-slider')?.value || 100);
            const velocity = parseFloat(document.getElementById('velocity-slider')?.value || 20);
            const angle = parseFloat(document.getElementById('angle-slider')?.value || 45);
            const materialType = document.getElementById('material-select')?.value || 'stone';
            
            const material = this.materials[materialType];
            if (!material) return;
            
            // Enhanced physics calculations
            const radius = diameter / 2;
            const volume = (4/3) * Math.PI * Math.pow(radius, 3);
            const mass = volume * material.density;
            const velocityMs = velocity * 1000;
            const energy = 0.5 * mass * Math.pow(velocityMs, 2);
            
            // Calculate survivability through atmosphere
            const survivalFactor = this.calculateSurvivalFactor(diameter, velocity, material.survivability);
            
            // Enhanced impact effects
            const effectiveEnergy = energy * survivalFactor;
            const impactEnergyMT = effectiveEnergy / this.physics.joulesToMegaton;
            const craterDiameter = this.calculateCraterDiameter(effectiveEnergy, angle);
            const fireballRadius = this.calculateFireballRadius(effectiveEnergy);
            const seismicMagnitude = this.calculateSeismicMagnitude(effectiveEnergy);
            
            // Update displays with enhanced formatting
            this.updateDisplay('impact-energy', this.formatEnergy(effectiveEnergy));
            this.updateDisplay('crater-size', `${craterDiameter.toFixed(2)} km`);
            this.updateDisplay('fireball-radius', `${fireballRadius.toFixed(2)} km`);
            this.updateDisplay('seismic-mag', seismicMagnitude.toFixed(1));
            
            // Update comparisons
            this.updateComparisons(effectiveEnergy, craterDiameter, fireballRadius, seismicMagnitude);
            
        } catch (error) {
            console.error('Calculation update failed:', error);
        }
    }
    
    calculateSurvivalFactor(diameter, velocity, baseSurvivability) {
        // Calculate what fraction of the asteroid survives atmospheric entry
        const penetrationPower = Math.pow(diameter, 1.5) * velocity * baseSurvivability;
        return Math.min(1, penetrationPower / 1000);
    }
    
    calculateCraterDiameter(energy, angle) {
        // Enhanced crater scaling with angle effects
        const g = this.physics.gravity;
        const rho = 2650; // Average target rock density
        const angleFactor = Math.pow(Math.sin(angle * Math.PI / 180), 1/3);
        return this.physics.craterScalingK * Math.pow(energy / (rho * g), 0.22) * angleFactor / 1000;
    }
    
    calculateFireballRadius(energy) {
        // Fireball scaling with atmospheric effects
        const tntEquivalent = energy / this.physics.joulesToTNT;
        return 0.28 * Math.pow(tntEquivalent, 0.33) / 1000;
    }
    
    calculateSeismicMagnitude(energy) {
        // Improved seismic magnitude calculation
        const joules = Math.max(energy, 1e6); // Prevent log(0)
        return (Math.log10(joules) - 4.8) / 1.5;
    }
    
    formatEnergy(energy) {
        const megatons = energy / this.physics.joulesToMegaton;
        if (megatons >= 1000000) {
            return `${(megatons / 1000000).toFixed(1)} GT`;
        } else if (megatons >= 1000) {
            return `${(megatons / 1000).toFixed(1)} GT`;
        } else if (megatons >= 1) {
            return `${megatons.toFixed(1)} MT`;
        } else {
            const kilotons = megatons * 1000;
            return `${kilotons.toFixed(1)} kT`;
        }
    }
    
    updateComparisons(energy, crater, fireball, seismic) {
        // Add real-world comparisons to make numbers meaningful
        const energyComparison = this.getEnergyComparison(energy);
        const craterComparison = this.getCraterComparison(crater);
        const fireballComparison = this.getFireballComparison(fireball);
        const seismicComparison = this.getSeismicComparison(seismic);
        
        this.updateDisplay('energy-comparison', energyComparison);
        this.updateDisplay('crater-comparison', craterComparison);
        this.updateDisplay('fireball-comparison', fireballComparison);
        this.updateDisplay('seismic-comparison', seismicComparison);
    }
    
    getEnergyComparison(energy) {
        const mt = energy / this.physics.joulesToMegaton;
        if (mt < 0.001) return 'Small building explosion';
        if (mt < 0.01) return 'City block destruction';
        if (mt < 0.1) return 'Small nuclear weapon';
        if (mt < 1) return 'Hiroshima-scale';
        if (mt < 10) return 'Largest nuclear weapons';
        if (mt < 100) return 'Tunguska-scale';
        if (mt < 1000) return 'Regional devastation';
        if (mt < 100000) return 'Chicxulub-scale';
        return 'Mass extinction event';
    }
    
    getCraterComparison(diameter) {
        if (diameter < 0.1) return 'Building-sized crater';
        if (diameter < 0.5) return 'City block crater';
        if (diameter < 1) return 'Stadium-sized crater';
        if (diameter < 5) return 'City-sized crater';
        if (diameter < 20) return 'Metropolitan crater';
        if (diameter < 100) return 'Regional crater';
        return 'Continental crater';
    }
    
    getFireballComparison(radius) {
        if (radius < 0.1) return 'Building engulfed';
        if (radius < 0.5) return 'Neighborhood burns';
        if (radius < 2) return 'City district ablaze';
        if (radius < 10) return 'Entire city burns';
        if (radius < 50) return 'Metropolitan firestorm';
        if (radius < 200) return 'Regional firestorm';
        return 'Continental burning';
    }
    
    getSeismicComparison(magnitude) {
        if (magnitude < 3) return 'Barely detectable';
        if (magnitude < 5) return 'Light earthquake';
        if (magnitude < 6) return 'Moderate earthquake';
        if (magnitude < 7) return 'Strong earthquake';
        if (magnitude < 8) return 'Major earthquake';
        if (magnitude < 9) return 'Great earthquake';
        return 'Mega-earthquake';
    }
    
    loadPreset(presetName) {
        try {
            const preset = this.asteroidPresets[presetName];
            if (!preset) return;
            
            // Animate preset loading
            this.animatePresetLoading();
            
            // Update controls
            this.setSliderValue('diameter-slider', 'diameter-value', preset.diameter);
            this.setSliderValue('velocity-slider', 'velocity-value', preset.velocity);
            this.setSliderValue('angle-slider', 'angle-value', preset.angle);
            
            const materialSelect = document.getElementById('material-select');
            if (materialSelect) {
                materialSelect.value = preset.material;
                this.updateMaterialPreview(preset.material);
            }
            
            // Update calculations and comparisons
            this.updateCalculations();
            this.updateSizeComparison(preset.diameter);
            this.updateVelocityDescription(preset.velocity);
            this.updateTrajectoryVisualization(preset.angle);
            
            this.showDragonNotification(`🐲 Loaded ${preset.name} configuration`, 'info');
            
        } catch (error) {
            console.error('Preset loading failed:', error);
        }
    }
    
    setSliderValue(sliderId, displayId, value) {
        const slider = document.getElementById(sliderId);
        const display = document.getElementById(displayId);
        
        if (slider) slider.value = value;
        if (display) display.textContent = value;
    }
    
    animatePresetLoading() {
        const presetButtons = document.querySelectorAll('.preset-btn');
        presetButtons.forEach(button => {
            button.style.transform = 'scale(0.95)';
            button.style.boxShadow = '0 0 20px rgba(31, 184, 205, 0.6)';
            setTimeout(() => {
                button.style.transform = '';
                button.style.boxShadow = '';
            }, 300);
        });
    }
    
    setupTargetSelection() {
        try {
            document.querySelectorAll('.continent-marker').forEach(marker => {
                marker.addEventListener('click', (e) => {
                    const lat = parseFloat(e.target.getAttribute('data-lat'));
                    const lng = parseFloat(e.target.getAttribute('data-lng'));
                    const name = e.target.getAttribute('data-name');
                    
                    this.selectTarget(lat, lng, name);
                });
            });
            
        } catch (error) {
            console.error('Target selection setup failed:', error);
        }
    }
    
    selectTarget(lat, lng, name) {
        try {
            this.selectedTarget = { lat, lng, name };
            
            // Update display
            const targetName = document.getElementById('target-name');
            if (targetName) {
                targetName.textContent = `${name} (${lat.toFixed(1)}°, ${lng.toFixed(1)}°)`;
            }
            
            // Animate crosshair
            const crosshair = document.getElementById('impact-crosshair');
            if (crosshair) {
                crosshair.classList.add('active');
                setTimeout(() => crosshair.classList.remove('active'), 4000);
            }
            
            // Dragon targeting sound effect (visual)
            this.animateDragonTargeting();
            
            this.showDragonNotification(`🎯 Dragon targets ${name}`, 'info');
            
        } catch (error) {
            console.error('Target selection failed:', error);
        }
    }
    
    animateDragonTargeting() {
        const earth = document.querySelector('.earth-sphere');
        if (earth) {
            earth.style.boxShadow = '0 0 50px rgba(255, 107, 53, 0.8), inset 0 0 50px rgba(255, 107, 53, 0.3)';
            setTimeout(() => {
                earth.style.boxShadow = '0 0 50px rgba(31, 184, 205, 0.3), inset 0 0 50px rgba(31, 184, 205, 0.1)';
            }, 1000);
        }
    }
    
    launchDragonSimulation() {
        try {
            this.simulationCount++;
            
            const launchButton = document.getElementById('launch-simulation');
            if (launchButton) {
                // Animate launch sequence
                launchButton.innerHTML = '🚀 Dragon Launching...';
                launchButton.disabled = true;
                launchButton.style.animation = 'pulse-glow 0.5s ease-in-out infinite';
                
                // Launch countdown
                let countdown = 3;
                const countdownInterval = setInterval(() => {
                    launchButton.innerHTML = `🐉 Launch in ${countdown}...`;
                    countdown--;
                    
                    if (countdown < 0) {
                        clearInterval(countdownInterval);
                        launchButton.innerHTML = '💥 IMPACT!';
                        
                        setTimeout(() => {
                            this.showDragonImpactResults();
                            launchButton.innerHTML = '🐉 Dragon Launch!';
                            launchButton.disabled = false;
                            launchButton.style.animation = '';
                        }, 1500);
                    }
                }, 800);
            }
            
            // Update stats
            this.updateDragonStats();
            this.checkSimulationAchievements();
            
        } catch (error) {
            console.error('Dragon simulation launch failed:', error);
        }
    }
    
    showDragonImpactResults() {
        try {
            // Calculate comprehensive results
            const diameter = parseFloat(document.getElementById('diameter-slider')?.value || 100);
            const velocity = parseFloat(document.getElementById('velocity-slider')?.value || 20);
            const materialType = document.getElementById('material-select')?.value || 'stone';
            const material = this.materials[materialType];
            
            const radius = diameter / 2;
            const volume = (4/3) * Math.PI * Math.pow(radius, 3);
            const mass = volume * material.density;
            const velocityMs = velocity * 1000;
            const energy = 0.5 * mass * Math.pow(velocityMs, 2);
            
            const survivalFactor = this.calculateSurvivalFactor(diameter, velocity, material.survivability);
            const effectiveEnergy = energy * survivalFactor;
            
            const craterDiameter = this.calculateCraterDiameter(effectiveEnergy, 45);
            const fireballRadius = this.calculateFireballRadius(effectiveEnergy);
            const casualties = this.estimateCasualties(fireballRadius, this.selectedTarget);
            
            // Update modal content
            this.updateDisplay('result-energy', this.formatEnergy(effectiveEnergy));
            this.updateDisplay('result-crater', `${craterDiameter.toFixed(2)} km`);
            this.updateDisplay('result-fireball', `${fireballRadius.toFixed(2)} km`);
            this.updateDisplay('result-casualties', this.formatNumber(casualties));
            
            // Create advanced visualizations
            this.createImpactVisualization(effectiveEnergy, craterDiameter, fireballRadius);
            
            // Show modal
            const modal = document.getElementById('impact-modal');
            if (modal) {
                modal.classList.remove('hidden');
                this.animateModalAppearance();
            }
            
            this.showDragonNotification('🐲 Dragon impact analysis complete!', 'success');
            
        } catch (error) {
            console.error('Impact results display failed:', error);
        }
    }
    
    estimateCasualties(fireballRadius, target) {
        // Enhanced casualty estimation based on location and population density
        const populationDensities = {
            'North America': 22,
            'Europe': 73,
            'Asia': 147,
            'Africa': 45,
            'South America': 23,
            'Australia': 3
        };
        
        const density = populationDensities[target.name] || 50;
        const areaKm2 = Math.PI * Math.pow(fireballRadius, 2);
        const population = areaKm2 * density;
        
        // Casualty rate varies by distance from impact
        const directKillRadius = fireballRadius * 0.3;
        const severeInjuryRadius = fireballRadius * 0.6;
        const lightInjuryRadius = fireballRadius;
        
        const directKills = Math.PI * Math.pow(directKillRadius, 2) * density * 0.9;
        const severeInjuries = Math.PI * (Math.pow(severeInjuryRadius, 2) - Math.pow(directKillRadius, 2)) * density * 0.7;
        const lightInjuries = Math.PI * (Math.pow(lightInjuryRadius, 2) - Math.pow(severeInjuryRadius, 2)) * density * 0.3;
        
        return Math.floor(directKills + severeInjuries + lightInjuries);
    }
    
    formatNumber(num) {
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        } else if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        } else {
            return num.toString();
        }
    }
    
    createImpactVisualization(energy, crater, fireball) {
        const canvas = document.getElementById('impact-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Animate impact sequence
        this.animateImpactSequence(ctx, canvas.width, canvas.height);
    }
    
    animateImpactSequence(ctx, width, height) {
        let frame = 0;
        const maxFrames = 60;
        
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            const progress = frame / maxFrames;
            
            if (progress < 0.2) {
                // Asteroid approach
                const x = width * (0.2 + progress * 3);
                const y = height * 0.3;
                ctx.fillStyle = '#1FB8CD';
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, 2 * Math.PI);
                ctx.fill();
                
                // Trail
                ctx.fillStyle = `rgba(31, 184, 205, ${0.5 - progress * 2})`;
                ctx.beginPath();
                ctx.arc(x - 20, y, 3, 0, 2 * Math.PI);
                ctx.fill();
                
            } else if (progress < 0.4) {
                // Atmospheric entry
                const x = width * 0.8;
                const y = height * (0.3 + (progress - 0.2) * 2);
                
                ctx.fillStyle = '#FF6B35';
                ctx.beginPath();
                ctx.arc(x, y, 8, 0, 2 * Math.PI);
                ctx.fill();
                
                // Fireball trail
                const gradient = ctx.createLinearGradient(x, y - 20, x, y + 20);
                gradient.addColorStop(0, 'rgba(255, 107, 53, 0)');
                gradient.addColorStop(1, 'rgba(255, 107, 53, 0.8)');
                ctx.fillStyle = gradient;
                ctx.fillRect(x - 10, y, 20, 30);
                
            } else {
                // Impact and explosion
                const x = width * 0.8;
                const y = height * 0.7;
                const explosionRadius = 50 * (progress - 0.4) / 0.6;
                
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, explosionRadius);
                gradient.addColorStop(0, '#FFFFFF');
                gradient.addColorStop(0.3, '#FF6B35');
                gradient.addColorStop(0.6, '#FF4500');
                gradient.addColorStop(1, 'rgba(255, 69, 0, 0)');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, explosionRadius, 0, 2 * Math.PI);
                ctx.fill();
                
                // Shockwave ring
                if (progress > 0.6) {
                    const shockRadius = 80 * (progress - 0.6) / 0.4;
                    ctx.strokeStyle = `rgba(31, 184, 205, ${1 - (progress - 0.6) / 0.4})`;
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.arc(x, y, shockRadius, 0, 2 * Math.PI);
                    ctx.stroke();
                }
            }
            
            frame++;
            if (frame <= maxFrames) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    initialize3DTracker() {
        try {
            const canvas = document.getElementById('solar-system-canvas');
            if (!canvas || !window.THREE) {
                console.log('3D dependencies not available, using fallback');
                this.show3DFallback();
                return;
            }
            
            // Basic 3D scene setup would go here
            // For now, show fallback
            this.show3DFallback();
            
        } catch (error) {
            console.error('3D tracker initialization failed:', error);
            this.show3DFallback();
        }
    }
    
    show3DFallback() {
        const canvas = document.getElementById('solar-system-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#0B1426';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#1FB8CD';
            ctx.font = '24px Orbitron';
            ctx.textAlign = 'center';
            ctx.fillText('🌌 3D Solar System', canvas.width / 2, canvas.height / 2 - 20);
            ctx.fillText('Live Asteroid Tracking', canvas.width / 2, canvas.height / 2 + 20);
        }
        
        this.loadAsteroidData();
        
        // Hide loading overlay
        const loadingOverlay = document.getElementById('3d-loading');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
    }
    
    setup3DTrackerControls() {
        const playPauseBtn = document.getElementById('play-pause');
        const speedToggleBtn = document.getElementById('speed-toggle');
        const resetViewBtn = document.getElementById('reset-view');
        
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                this.solarSystemPaused = !this.solarSystemPaused;
                playPauseBtn.textContent = this.solarSystemPaused ? '▶️ Play' : '⏸️ Pause';
            });
        }
        
        if (speedToggleBtn) {
            speedToggleBtn.addEventListener('click', () => {
                this.solarSystemSpeed = this.solarSystemSpeed === 1 ? 5 : this.solarSystemSpeed === 5 ? 10 : 1;
                speedToggleBtn.textContent = `🚀 ${this.solarSystemSpeed}x Speed`;
            });
        }
        
        if (resetViewBtn) {
            resetViewBtn.addEventListener('click', () => {
                this.showDragonNotification('🔄 3D view reset', 'info');
            });
        }
    }
    
    loadAsteroidData() {
        // Load fallback asteroid data for display
        const asteroidData = [
            { name: '2025 AA1', diameter: '150-340m', distance: '7.2M km', velocity: '18.4 km/s', hazardous: false },
            { name: '2025 BB2', diameter: '420-950m', distance: '12.8M km', velocity: '22.1 km/s', hazardous: true },
            { name: '2025 CC3', diameter: '80-180m', distance: '4.3M km', velocity: '15.9 km/s', hazardous: false },
            { name: '2025 DD4', diameter: '250-560m', distance: '18.4M km', velocity: '21.7 km/s', hazardous: true },
            { name: '2025 EE5', diameter: '120-270m', distance: '9.6M km', velocity: '16.3 km/s', hazardous: false }
        ];
        
        const asteroidList = document.getElementById('asteroid-list');
        if (asteroidList) {
            asteroidList.innerHTML = asteroidData.map(asteroid => `
                <div class="asteroid-item" onclick="window.DRACONID.selectAsteroid('${asteroid.name}')">
                    <div class="asteroid-name">${asteroid.name}</div>
                    <div class="asteroid-details">
                        <div>Diameter: ${asteroid.diameter}</div>
                        <div>Distance: ${asteroid.distance}</div>
                        <div>Velocity: ${asteroid.velocity}</div>
                        <div class="hazard-status ${asteroid.hazardous ? 'hazardous' : 'safe'}">
                            ${asteroid.hazardous ? '⚠️ Potentially Hazardous' : '✅ Safe'}
                        </div>
                    </div>
                </div>
            `).join('');
        }
        
        // Update stats
        this.updateDisplay('total-neos', '34,852');
        this.updateDisplay('hazardous-count', '2,347');
        this.updateDisplay('today-approaches', '5');
    }
    
    selectAsteroid(name) {
        this.showDragonNotification(`🛰️ Dragon tracks ${name}`, 'info');
    }
    
    setupDefenseControls() {
        // Strategy selection
        document.querySelectorAll('.btn--strategy-select').forEach(button => {
            button.addEventListener('click', (e) => {
                const strategyCard = e.target.closest('.strategy-card');
                const strategy = strategyCard.getAttribute('data-strategy');
                this.selectDefenseStrategy(strategy);
            });
        });
        
        // Scenario generation
        const generateBtn = document.getElementById('generate-scenario');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateNewScenario());
        }
        
        // Mission execution
        const executeBtn = document.getElementById('execute-mission');
        if (executeBtn) {
            executeBtn.addEventListener('click', () => this.executeDragonMission());
        }
    }
    
    generateNewScenario() {
        try {
            const difficulty = document.getElementById('difficulty-level')?.value || 'medium';
            const scenario = this.createProceduralScenario(difficulty);
            this.currentScenario = scenario;
            
            const scenarioContainer = document.getElementById('current-scenario');
            if (scenarioContainer) {
                scenarioContainer.innerHTML = `
                    <div class="scenario-display">
                        <h4>${scenario.title}</h4>
                        <div class="scenario-details">
                            <p><strong>Threat:</strong> ${scenario.description}</p>
                            <div class="scenario-parameters">
                                <div class="param-row"><span>Time to Impact:</span> <span>${scenario.timeFrame}</span></div>
                                <div class="param-row"><span>Asteroid Size:</span> <span>${scenario.asteroidSize}m</span></div>
                                <div class="param-row"><span>Difficulty:</span> <span class="difficulty-${difficulty}">${difficulty.toUpperCase()}</span></div>
                                <div class="param-row"><span>Complications:</span> <span>${scenario.complications.join(', ')}</span></div>
                            </div>
                        </div>
                        <div class="scenario-objectives">
                            <h5>Mission Objectives:</h5>
                            <ul>
                                ${scenario.objectives.map(obj => `<li>${obj}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `;
            }
            
            this.showDragonNotification(`🎲 New ${difficulty} scenario generated!`, 'info');
            
        } catch (error) {
            console.error('Scenario generation failed:', error);
        }
    }
    
    createProceduralScenario(difficulty) {
        const difficultyMultiplier = {
            easy: 0.5,
            medium: 1.0,
            hard: 1.5,
            nightmare: 2.0
        }[difficulty] || 1.0;
        
        // Randomly select scenario components
        const timeFrame = this.scenarioTemplates.timeFrames[
            Math.floor(Math.random() * this.scenarioTemplates.timeFrames.length)
        ];
        
        const asteroidType = this.scenarioTemplates.asteroidTypes[
            Math.floor(Math.random() * this.scenarioTemplates.asteroidTypes.length)
        ];
        
        // Select 1-3 complications based on difficulty
        const numComplications = Math.min(3, Math.floor(Math.random() * 3 + 1) + Math.floor(difficultyMultiplier));
        const selectedComplications = [];
        const availableComplications = [...this.scenarioTemplates.complications];
        
        for (let i = 0; i < numComplications; i++) {
            const index = Math.floor(Math.random() * availableComplications.length);
            selectedComplications.push(availableComplications.splice(index, 1)[0]);
        }
        
        // Generate asteroid size based on difficulty
        const baseSize = 100 + Math.random() * 400; // 100-500m base
        const asteroidSize = Math.floor(baseSize * (0.5 + difficultyMultiplier * 0.5));
        
        // Calculate overall difficulty
        const totalDifficulty = timeFrame.difficulty + asteroidType.difficulty + 
            selectedComplications.reduce((sum, comp) => sum + comp.difficulty, 0);
        
        // Generate scenario description
        const scenarioNames = [
            "Operation Dragon Shield",
            "Project Cosmic Guardian",
            "Mission Stellar Defender",
            "Initiative Sky Warden",
            "Campaign Star Protector"
        ];
        
        const title = scenarioNames[Math.floor(Math.random() * scenarioNames.length)];
        
        const description = `A ${asteroidSize}m ${asteroidType.name.toLowerCase()} asteroid has been detected on a collision course with Earth. ${timeFrame.description}`;
        
        // Generate objectives
        const objectives = [
            "Assess threat level and impact consequences",
            "Select optimal deflection strategy",
            "Coordinate international response efforts"
        ];
        
        if (totalDifficulty > 1.0) {
            objectives.push("Manage public communication and panic");
        }
        
        if (selectedComplications.some(comp => comp.name.includes('Budget'))) {
            objectives.push("Secure adequate funding for mission");
        }
        
        return {
            title,
            description,
            timeFrame: timeFrame.time,
            asteroidSize,
            asteroidType: asteroidType.name,
            complications: selectedComplications.map(comp => comp.name),
            difficulty: totalDifficulty,
            objectives
        };
    }
    
    selectDefenseStrategy(strategy) {
        try {
            this.selectedStrategy = strategy;
            const strategyData = this.defenseStrategies[strategy];
            
            // Update UI
            document.querySelectorAll('.strategy-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            const selectedCard = document.querySelector(`[data-strategy="${strategy}"]`);
            if (selectedCard) {
                selectedCard.classList.add('selected');
            }
            
            // Update mission status
            const statusText = document.getElementById('status-text');
            if (statusText) {
                statusText.textContent = `${strategyData.name} Selected`;
            }
            
            // Enable execution
            const executeBtn = document.getElementById('execute-mission');
            if (executeBtn) {
                executeBtn.disabled = false;
            }
            
            this.showDragonNotification(`🛡️ Dragon chooses ${strategyData.name}`, 'info');
            
        } catch (error) {
            console.error('Strategy selection failed:', error);
        }
    }
    
    executeDragonMission() {
        if (!this.selectedStrategy || !this.currentScenario) {
            this.showDragonNotification('⚠️ Select strategy and scenario first', 'warning');
            return;
        }
        
        const strategy = this.defenseStrategies[this.selectedStrategy];
        const executeBtn = document.getElementById('execute-mission');
        
        if (executeBtn) {
            executeBtn.innerHTML = '🐉 Dragon Mission Executing...';
            executeBtn.disabled = true;
            
            // Animate mission progress
            const progressRing = document.getElementById('mission-progress');
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += 2;
                if (progressRing) {
                    progressRing.style.background = `conic-gradient(#1FB8CD ${progress * 3.6}deg, rgba(255,255,255,0.1) ${progress * 3.6}deg)`;
                }
                
                if (progress >= 100) {
                    clearInterval(progressInterval);
                    
                    // Calculate success based on strategy and scenario
                    const successChance = this.calculateMissionSuccess(strategy, this.currentScenario);
                    const success = Math.random() * 100 < successChance;
                    
                    if (success) {
                        executeBtn.innerHTML = '✅ Dragon Victory!';
                        executeBtn.style.background = 'linear-gradient(45deg, #10B981, #059669)';
                        this.showDragonNotification('🎉 Dragon successfully defended Earth!', 'success');
                        this.awardAchievement('earth_defender');
                    } else {
                        executeBtn.innerHTML = '❌ Mission Failed';
                        executeBtn.style.background = 'linear-gradient(45deg, #EF4444, #DC2626)';
                        this.showDragonNotification('💥 Mission failed. The dragon must try again.', 'error');
                    }
                    
                    setTimeout(() => {
                        executeBtn.innerHTML = '🐉 Execute Dragon Mission';
                        executeBtn.style.background = '';
                        executeBtn.disabled = false;
                        if (progressRing) {
                            progressRing.style.background = 'conic-gradient(#1FB8CD 0deg, rgba(255,255,255,0.1) 0deg)';
                        }
                    }, 5000);
                }
            }, 50);
        }
    }
    
    calculateMissionSuccess(strategy, scenario) {
        let baseSuccess = strategy.successRate;
        
        // Adjust for scenario difficulty
        baseSuccess -= scenario.difficulty * 10;
        
        // Adjust for complications
        scenario.complications.forEach(compName => {
            const comp = this.scenarioTemplates.complications.find(c => c.name === compName);
            if (comp) {
                baseSuccess -= comp.difficulty * 10;
            }
        });
        
        return Math.max(10, Math.min(95, baseSuccess));
    }
    
    setupEducationControls() {
        document.querySelectorAll('.btn--module-start').forEach(button => {
            button.addEventListener('click', (e) => {
                const moduleCard = e.target.closest('.module-card');
                const module = moduleCard.getAttribute('data-module');
                this.startEducationModule(module);
            });
        });
        
        const prevBtn = document.getElementById('prev-lesson');
        const nextBtn = document.getElementById('next-lesson');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousLesson());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextLesson());
        }
    }
    
    startEducationModule(moduleId) {
        const module = this.educationModules[moduleId];
        if (!module) return;
        
        this.currentModule = moduleId;
        this.currentLesson = 0;
        
        const modal = document.getElementById('education-modal');
        const moduleTitle = document.getElementById('module-title');
        
        if (modal && moduleTitle) {
            moduleTitle.textContent = module.title;
            this.displayLesson();
            modal.classList.remove('hidden');
        }
        
        this.showDragonNotification(`📚 Dragon knowledge: ${module.title}`, 'info');
    }
    
    displayLesson() {
        if (!this.currentModule) return;
        
        const module = this.educationModules[this.currentModule];
        const lesson = module.lessons[this.currentLesson];
        
        if (!lesson) return;
        
        const lessonContent = document.getElementById('lesson-content');
        const lessonIndicator = document.getElementById('lesson-indicator');
        const prevBtn = document.getElementById('prev-lesson');
        const nextBtn = document.getElementById('next-lesson');
        
        if (lessonContent) {
            lessonContent.innerHTML = `
                <div class="lesson-header">
                    <h4>${lesson.title}</h4>
                    <div class="lesson-meta">
                        <span class="lesson-duration">⏱️ ${lesson.duration}</span>
                        <span class="lesson-xp">✨ ${lesson.xp} XP</span>
                    </div>
                </div>
                <div class="lesson-text">
                    ${lesson.content.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
                </div>
            `;
        }
        
        if (lessonIndicator) {
            lessonIndicator.textContent = `Lesson ${this.currentLesson + 1} of ${module.lessons.length}`;
        }
        
        if (prevBtn) {
            prevBtn.disabled = this.currentLesson === 0;
        }
        
        if (nextBtn) {
            nextBtn.textContent = this.currentLesson === module.lessons.length - 1 ? 'Complete Module' : 'Next →';
        }
    }
    
    nextLesson() {
        if (!this.currentModule) return;
        
        const module = this.educationModules[this.currentModule];
        const lesson = module.lessons[this.currentLesson];
        
        // Award XP for completing lesson
        this.awardXP(lesson.xp);
        
        if (this.currentLesson < module.lessons.length - 1) {
            this.currentLesson++;
            this.displayLesson();
        } else {
            this.completeModule();
        }
    }
    
    previousLesson() {
        if (this.currentLesson > 0) {
            this.currentLesson--;
            this.displayLesson();
        }
    }
    
    completeModule() {
        const module = this.educationModules[this.currentModule];
        
        // Award module completion XP
        this.awardXP(module.xpReward);
        this.awardAchievement('module_master');
        
        this.closeModal('education-modal');
        this.showDragonNotification(`🎓 Module mastered! Dragon wisdom increased!`, 'success');
        
        // Update module progress
        this.updateModuleProgress(this.currentModule, 100);
    }
    
    updateModuleProgress(moduleId, progress) {
        const moduleCard = document.querySelector(`[data-module="${moduleId}"]`);
        if (!moduleCard) return;
        
        const progressBar = moduleCard.querySelector('.progress-fill');
        const progressText = moduleCard.querySelector('.module-progress span');
        
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        if (progressText) {
            const module = this.educationModules[moduleId];
            const completed = Math.floor((progress / 100) * module.totalLessons);
            progressText.textContent = `${completed}/${module.totalLessons} completed`;
        }
    }
    
    awardXP(amount) {
        this.userXP += amount;
        this.updateDragonLevel();
        this.updateXPDisplay();
        
        // Show XP gain animation
        this.showXPGain(amount);
        
        // Check for XP-based achievements
        if (this.userXP >= 1000) {
            this.awardAchievement('knowledge_seeker');
        }
    }
    
    updateDragonLevel() {
        const levels = [
            { threshold: 0, name: 'Hatchling' },
            { threshold: 200, name: 'Young Dragon' },
            { threshold: 500, name: 'Adult Dragon' },
            { threshold: 1000, name: 'Elder Dragon' },
            { threshold: 2000, name: 'Ancient Dragon' },
            { threshold: 5000, name: 'Legendary Dragon' }
        ];
        
        for (let i = levels.length - 1; i >= 0; i--) {
            if (this.userXP >= levels[i].threshold) {
                if (this.dragonLevel !== levels[i].name) {
                    this.dragonLevel = levels[i].name;
                    this.showDragonNotification(`🐉 Dragon evolved to ${this.dragonLevel}!`, 'success');
                }
                break;
            }
        }
    }
    
    updateXPDisplay() {
        const dragonLevelEl = document.getElementById('dragon-level');
        const xpFill = document.getElementById('xp-fill');
        const xpText = document.getElementById('xp-text');
        
        if (dragonLevelEl) {
            dragonLevelEl.textContent = this.dragonLevel;
        }
        
        // Calculate progress to next level
        const levels = [0, 200, 500, 1000, 2000, 5000];
        let currentLevel = 0;
        let nextLevel = 200;
        
        for (let i = 0; i < levels.length - 1; i++) {
            if (this.userXP >= levels[i] && this.userXP < levels[i + 1]) {
                currentLevel = levels[i];
                nextLevel = levels[i + 1];
                break;
            }
        }
        
        if (this.userXP >= 5000) {
            currentLevel = 5000;
            nextLevel = 5000;
        }
        
        const progress = nextLevel > currentLevel ? 
            ((this.userXP - currentLevel) / (nextLevel - currentLevel)) * 100 : 100;
        
        if (xpFill) {
            xpFill.style.width = `${Math.min(progress, 100)}%`;
        }
        
        if (xpText) {
            xpText.textContent = `${this.userXP} / ${nextLevel} XP`;
        }
    }
    
    showXPGain(amount) {
        // Create floating XP text animation
        const xpElement = document.createElement('div');
        xpElement.className = 'xp-gain-animation';
        xpElement.textContent = `+${amount} XP`;
        xpElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #1FB8CD;
            font-size: 24px;
            font-weight: bold;
            font-family: Orbitron, monospace;
            pointer-events: none;
            z-index: 4000;
            text-shadow: 0 0 10px rgba(31, 184, 205, 0.6);
            animation: xp-float 2s ease-out forwards;
        `;
        
        document.body.appendChild(xpElement);
        
        setTimeout(() => {
            if (xpElement.parentNode) {
                xpElement.parentNode.removeChild(xpElement);
            }
        }, 2000);
    }
    
    setupModalControls() {
        // Close buttons
        document.querySelectorAll('.modal-close').forEach(button => {
            button.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    this.closeModal(modal.id);
                }
            });
        });
        
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(button => {
            button.addEventListener('click', (e) => this.switchTab(e.target));
        });
        
        // Modal-specific buttons
        const runAnotherBtn = document.getElementById('run-another');
        if (runAnotherBtn) {
            runAnotherBtn.addEventListener('click', () => {
                this.closeModal('impact-modal');
                this.navigateToSection('simulator');
            });
        }
        
        const downloadBtn = document.getElementById('download-report');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadDragonReport());
        }
    }
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    
    switchTab(tabButton) {
        const tabContainer = tabButton.parentElement;
        const modalBody = tabButton.closest('.modal-body');
        
        if (!tabContainer || !modalBody) return;
        
        const targetTab = tabButton.getAttribute('data-tab');
        
        // Update tab buttons
        tabContainer.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        tabButton.classList.add('active');
        
        // Update tab content
        modalBody.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        const targetContent = document.getElementById(`${targetTab}-content`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }
    
    downloadDragonReport() {
        const reportData = {
            timestamp: new Date().toISOString(),
            dragonSystem: 'DRACONID v2.0.0',
            target: this.selectedTarget,
            parameters: {
                diameter: document.getElementById('diameter-slider')?.value,
                velocity: document.getElementById('velocity-slider')?.value,
                angle: document.getElementById('angle-slider')?.value,
                material: document.getElementById('material-select')?.value
            },
            results: {
                energy: document.getElementById('result-energy')?.textContent,
                crater: document.getElementById('result-crater')?.textContent,
                fireball: document.getElementById('result-fireball')?.textContent,
                casualties: document.getElementById('result-casualties')?.textContent
            },
            dragonLevel: this.dragonLevel,
            totalXP: this.userXP,
            simulationCount: this.simulationCount
        };
        
        const reportJSON = JSON.stringify(reportData, null, 2);
        const blob = new Blob([reportJSON], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `draconid-dragon-report-${Date.now()}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        this.showDragonNotification('🐉 Dragon report downloaded!', 'success');
    }
    
    generateInitialScenario() {
        if (!this.currentScenario) {
            setTimeout(() => {
                this.generateNewScenario();
            }, 500);
        }
    }
    
    loadDailyWisdom() {
        const wisdomCard = document.getElementById('daily-wisdom');
        if (!wisdomCard) return;
        
        const wisdoms = [
            "The dragon sees all asteroids, but only the wise dragon chooses when to strike.",
            "Like the ancient Draconids lighting up October skies, knowledge illuminates the darkness of ignorance.",
            "A single dragon's breath can deflect a mountain - timing and precision matter more than raw power.",
            "The constellation Draco has watched over Earth for millennia - now we must watch over Earth for future millennia.",
            "Every simulation teaches the dragon new ways to protect its precious hoard - planet Earth.",
            "The Draconid meteor shower reminds us: even small particles can create spectacular displays when they encounter atmosphere.",
            "Ancient dragons hoarded gold; modern dragons hoard knowledge about cosmic threats."
        ];
        
        const todaysWisdom = wisdoms[new Date().getDay()];
        
        wisdomCard.innerHTML = `
            <div class="wisdom-content">
                <div class="wisdom-icon">🐲</div>
                <div class="wisdom-text">${todaysWisdom}</div>
                <div class="wisdom-signature">- The Ancient Dragons of Draco</div>
            </div>
        `;
    }
    
    updateDragonStats() {
        // Update live statistics
        const trackedObjects = document.getElementById('tracked-objects');
        const dragonPowerEl = document.getElementById('dragon-power');
        const simulationsEl = document.getElementById('simulations-count');
        
        if (trackedObjects) {
            const baseCount = 34852;
            const newCount = baseCount + Math.floor(Math.random() * 10);
            trackedObjects.textContent = newCount.toLocaleString();
        }
        
        if (dragonPowerEl) {
            dragonPowerEl.textContent = `${this.dragonPower}%`;
        }
        
        if (simulationsEl) {
            simulationsEl.textContent = this.simulationCount.toString();
        }
    }
    
    animateDragonPower() {
        // Animate dragon power when navigating
        this.dragonPower = Math.max(50, Math.min(100, this.dragonPower + Math.floor(Math.random() * 10) - 5));
        this.updateDragonStats();
    }
    
    startDragonAnimations() {
        // Start continuous dragon animation effects
        setInterval(() => {
            this.animateDragonBreath();
            this.updateDragonStats();
        }, 3000);
    }
    
    animateDragonBreath() {
        const dragonBreath = document.querySelectorAll('.dragon-breath, .dragon-breath-hero');
        dragonBreath.forEach(breath => {
            breath.style.animation = 'none';
            setTimeout(() => {
                breath.style.animation = 'breath-glow 2s ease-in-out infinite';
            }, 10);
        });
    }
    
    animateModalAppearance() {
        const modal = document.querySelector('.modal:not(.hidden) .dragon-modal');
        if (modal) {
            modal.style.transform = 'scale(0.8) rotateY(10deg)';
            setTimeout(() => {
                modal.style.transform = 'scale(1) rotateY(0deg)';
                modal.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }, 10);
        }
    }
    
    checkSimulationAchievements() {
        if (this.simulationCount === 1) {
            this.awardAchievement('first_simulation');
        }
        
        if (this.simulationCount === 10) {
            this.awardAchievement('simulation_expert');
        }
        
        const diameter = parseFloat(document.getElementById('diameter-slider')?.value || 100);
        if (diameter >= 1000) {
            this.awardAchievement('city_killer');
        }
        
        if (diameter >= 10000) {
            this.awardAchievement('extinction_event');
        }
    }
    
    awardAchievement(achievementId) {
        if (this.achievements.has(achievementId)) return;
        
        this.achievements.add(achievementId);
        const achievement = this.achievementDefinitions[achievementId];
        
        if (achievement) {
            this.awardXP(achievement.xp);
            this.showDragonNotification(`🏆 Achievement: ${achievement.name}!`, 'success');
        }
        
        this.saveProgress();
    }
    
    showDragonNotification(message, type = 'info') {
        const container = document.getElementById('dragon-notifications');
        if (!container) return;
        
        const notification = document.createElement('div');
        notification.className = `dragon-notification ${type}`;
        notification.textContent = message;
        
        container.appendChild(notification);
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    updateDisplay(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value;
        }
    }
    
    initializeTheme() {
        const savedTheme = localStorage.getItem('draconid-theme') || 'dark';
        document.documentElement.setAttribute('data-color-scheme', savedTheme);
        
        const themeIcon = document.querySelector('#theme-toggle');
        if (themeIcon) {
            themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
        }
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('draconid-theme', newTheme);
        
        const themeIcon = document.querySelector('#theme-toggle');
        if (themeIcon) {
            themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        }
        
        this.showDragonNotification(`🎨 Dragon theme: ${newTheme} mode`, 'info');
    }
    
    loadUserProgress() {
        try {
            const saved = localStorage.getItem('draconid-progress');
            if (saved) {
                const progress = JSON.parse(saved);
                this.userXP = progress.userXP || 0;
                this.simulationCount = progress.simulationCount || 0;
                this.achievements = new Set(progress.achievements || []);
                this.updateDragonLevel();
                this.updateXPDisplay();
            }
        } catch (error) {
            console.error('Progress loading failed:', error);
        }
    }
    
    saveProgress() {
        try {
            const progress = {
                userXP: this.userXP,
                simulationCount: this.simulationCount,
                achievements: Array.from(this.achievements),
                dragonLevel: this.dragonLevel,
                timestamp: Date.now()
            };
            localStorage.setItem('draconid-progress', JSON.stringify(progress));
        } catch (error) {
            console.error('Progress saving failed:', error);
        }
    }
}

// Initialize DRACONID when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Make DRACONID globally accessible
        window.DRACONID = new DRACONID();
        console.log('🐉 DRACONID Dragon Defense System is fully operational!');
    } catch (error) {
        console.error('🔥 DRACONID failed to awaken:', error);
        
        // Fallback error display
        document.body.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #0B1426; color: #1FB8CD; text-align: center; font-family: 'Orbitron', monospace; flex-direction: column;">
                <div style="font-size: 4rem; margin-bottom: 2rem;">🐉</div>
                <h1 style="font-size: 2rem; margin-bottom: 1rem;">DRACONID System Error</h1>
                <p style="margin-bottom: 2rem;">The dragon failed to awaken. Please refresh to try again.</p>
                <button onclick="location.reload()" style="background: linear-gradient(45deg, #1FB8CD, #FF6B35); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; font-family: inherit;">🔄 Awaken Dragon</button>
            </div>
        `;
    }
});

// Global error handling
window.addEventListener('error', (event) => {
    console.error('🔥 Dragon error:', event.error);
    if (window.DRACONID) {
        window.DRACONID.showDragonNotification('⚠️ Dragon encountered an error', 'error');
    }
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('🔥 Dragon promise error:', event.reason);
    if (window.DRACONID) {
        window.DRACONID.showDragonNotification('⚠️ Dragon promise failed', 'error');
    }
    event.preventDefault();
});

// Add additional CSS animations via JavaScript
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes xp-float {
        0% { 
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
        }
        20% { 
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
        }
        100% { 
            transform: translate(-50%, -200px) scale(1);
            opacity: 0;
        }
    }
    
    @keyframes velocity-streak {
        0% { opacity: 0; transform: translateX(-100%); }
        50% { opacity: 1; transform: translateX(0%); }
        100% { opacity: 0; transform: translateX(100%); }
    }
    
    .wisdom-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 12px;
    }
    
    .wisdom-icon {
        font-size: 3rem;
        animation: dragon-breathe 3s ease-in-out infinite;
    }
    
    .wisdom-text {
        font-style: italic;
        font-size: 1.1rem;
        line-height: 1.6;
        color: var(--dragon-primary);
    }
    
    .wisdom-signature {
        font-size: 0.9rem;
        color: var(--color-text-secondary);
        font-weight: 500;
    }
    
    .scenario-display h4 {
        color: var(--dragon-primary);
        font-family: var(--font-dragon);
        margin-bottom: 16px;
    }
    
    .param-row {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid var(--glass-border);
    }
    
    .param-row:last-child {
        border-bottom: none;
    }
    
    .scenario-objectives h5 {
        color: var(--dragon-accent);
        margin: 16px 0 8px 0;
    }
    
    .scenario-objectives ul {
        list-style: none;
        padding: 0;
    }
    
    .scenario-objectives li {
        padding: 4px 0;
        position: relative;
        padding-left: 20px;
    }
    
    .scenario-objectives li::before {
        content: '🎯';
        position: absolute;
        left: 0;
    }
`;

document.head.appendChild(additionalStyles);