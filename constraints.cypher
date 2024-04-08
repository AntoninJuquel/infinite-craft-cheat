CREATE CONSTRAINT element_name_unique IF NOT EXISTS
FOR (element:ELEMENT)
REQUIRE element.name IS UNIQUE;

CREATE CONSTRAINT pair_first_second_key IF NOT EXISTS
FOR (pair:PAIR)
REQUIRE (pair.first, pair.second, pair.result) IS NODE KEY
