package geolocator;

/**
 * Instances of this object represent a campus location. Instances are stored
 * in a KDTree as the values.
 */
public class GeolocatorObject {

  private double[] coords;
  private String name;
  private String[] searchNames;
  private int occupancy;
  private double radius;

  /**
   * Constructor of the GeolocatorObject class. Assigns values to the class's
   * instance varables.
   * @param coords coordinates of location
   * @param name name of location
   * @param searchNames alternate search names of location
   * @param occupancy occupancy of location
   */
  public GeolocatorObject(double[] coords, String name, String[] searchNames, int occupancy, double radius) {

    this.coords = coords;
    this.name = name;
    this.searchNames = searchNames;
    this.occupancy = occupancy;
    this.radius = radius;
  }

  /**
   * Getter method for coordinates of this location.
   * @return coordinates of location in an array of doubles
   */
  public double[] getCoords() {

    return this.coords;
  }

  /**
   * Getter method for name of this location.
   * @return name of location
   */
  public String getName() {

    return this.name;
  }

  /**
   * Getter method for alternate search names of this location.
   * @return alternate search names in an array of strings
   */
  public String[] getSearchNames() {

    return this.searchNames;
  }

  /**
   * Increments occupancy of this location by 1.
   * @return occupancy
   */
  public void incrementOccupancy() {

    this.occupancy++;
  }

  /**
   * Getter method for occupancy of this location.
   * @return occupancy
   */
  public int getOccupancy() {

    return this.occupancy;
  }

  /**
   * Getter method for radius of this location.
   * @return radius of location
   */
  public double getRadius() {

    return this.radius;
  }
}
