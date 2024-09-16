CREATE CONSTRAINT element_name_unique IF NOT EXISTS
FOR (element:Element)
REQUIRE element.name IS UNIQUE;